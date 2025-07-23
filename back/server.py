from datetime import date, datetime
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "your_secret_key")
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret")
jwt = JWTManager(app)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["db"]
users_collection = db["users"]
seats_collection = db["seats"]
bookings_collection = db["bookings"]

# User Signup
@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.json
    full_name = data.get("fullName")
    username = data.get("username")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    role = data.get("role")

    if not all([full_name, username, password, confirm_password, role]):
        return jsonify({"error": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "fullName": full_name,
        "username": username,
        "password": hashed_password,
        "role": role
    }

    users_collection.insert_one(new_user)
    return jsonify({"message": "User created successfully"}), 201

# User Login
@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity={"username": username, "role": user["role"]})
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

@app.route("/api/seats", methods=["GET"])
def get_seats():
    seats = seats_collection.find()
    seat_list = []
    for seat in seats:
        seat["_id"] = str(seat["_id"])  # Convert ObjectId to string
        seat_list.append(seat)
    return jsonify({"seats": seat_list})



@app.route('/api/seats/get-booked', methods=['POST'])
def get_booked_seats():
    data = request.get_json()
    date = data.get('date')

    bookings = bookings_collection.find({ "date": date })
    booked_seats = [b['seatId'] for b in bookings]

    return jsonify({ "bookedSeats": booked_seats })


@app.route('/api/seats/reserve', methods=['POST'])
def reserve_seat():
    data = request.json
    employee_id = data.get("employeeId")
    seat_id = data.get("seatId")
    date_str = data.get("date")  # format: 'YYYY-MM-DD'

    if not (employee_id and seat_id and date_str):
        return jsonify({"error": "Missing fields"}), 400

    existing =bookings_collection.find_one({
        "seatId": seat_id,
        "date": date_str
    })

    if existing:
        return jsonify({"error": "Seat already booked"}), 409

    bookings_collection.insert_one({
        "employeeId": employee_id,
        "seatId": seat_id,
        "date": date_str
    })

    return jsonify({"message": "Seat reserved successfully"}), 200


# Optional endpoint to populate initial 20 seats
@app.route('/api/seats/populate', methods=['POST'])
def populate_seats():
    seats.delete_many({})
    seats = []
    for i in range(20):
        seat = {
            "seatId": f"S{i + 1}",
            "row": i // 5,
            "col": i % 5
        }
        seats.append(seat)
    seats.insert_many(seats)
    return jsonify({ "message": "seats populated." })

# Allocation dashboard
@app.route('/api/allocation-data', methods=['GET'])
def get_allocation_data():
    today_str = date.today().isoformat()
    employees = list(users_collection.find({}, {"_id": 1, "fullName": 1}))
    for e in employees:
        e["id"] = str(e.pop("_id"))

    reservations_cursor = bookings_collection.find({"date": today_str, "status": "booked"})
    reserved_ids = [str(r['employeeId']) for r in reservations_cursor]

    seats_available = 25 - seats_collection.count_documents({"date": today_str, "status": "booked"})

    return jsonify({
        "companyName": "TCS",
        "employees": employees,
        "seatsAvailable": seats_available,
        "reservations": reserved_ids
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)