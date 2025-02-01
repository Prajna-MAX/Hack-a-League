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
CORS(app, supports_credentials=True)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://root:root@hack-a-league.beala.mongodb.net/?retryWrites=true&w=majority&appName=hack-a-league&tls=true")
client = MongoClient(MONGO_URI)
db = client["db"]
users_collection = db["users"]
seats_collection = db["seats"]
bookings_collection = db["bookings"]
departments_collection = db["departments"]

# User Signup
@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.json
    full_name = data.get("fullName")
    username = data.get("username")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    role = data.get("role")

    if not full_name or not username or not password or not confirm_password or not role:
        return jsonify({"error": "All fields are required"}), 400
    
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    
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
    
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity={"username": username, "role": user["role"]})
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

# Get all seats
@app.route('/api/seats', methods=['GET'])
def get_seats():
    seats = list(seats_collection.find({}, {"_id": 0}))
    return jsonify(seats)


@app.route("/api/seats/reserve", methods=["POST"])
def reserve_seat():
    data = request.json
    date = data.get("date")
    seats = data.get("seats")

    if not date or not seats:
        return jsonify({"error": "Date and seats are required"}), 400

    for seat in seats:
        row, col = seat["row"], seat["col"]

        if seats_collection.find_one({"date": date, "row": row, "col": col}):
            return jsonify({"error": f"Seat at {row},{col} is already booked!"}), 400

        seats_collection.insert_one({"date": date, "row": row, "col": col, "is_occupied": True})

    return jsonify({"message": "Seats reserved successfully!"}), 201

@app.route("/api/seats/get-booked", methods=["POST"])
def get_booked_seats():
    data = request.json
    date = data.get("date")

    if not date:
        return jsonify({"error": "Date is required"}), 400

    booked_seats = list(seats_collection.find({"date": date}, {"_id": 0, "row": 1, "col": 1}))
    return jsonify({"bookedSeats": booked_seats}), 200

@app.route('/api/available-seats/<int:num_seats>', methods=['GET'])
def get_available_seats(num_seats):
    # Get all available seats from the 'seats' collection
    available_seats_cursor = seats_collection.find({'status': 'available'})
    
    # Convert cursor to a list and limit to the requested number of seats
    available_seats_list = list(available_seats_cursor)[:num_seats]
    
    # Only return the seat IDs or other relevant details
    seat_numbers = [seat['seat_id'] for seat in available_seats_list]
    
    return jsonify(seat_numbers)



@app.route('/api/departments', methods=['GET'])
def get_departments():
    try:
        departments = list(departments_collection.find({}))
        departments_list = [
            {"id": str(dept["_id"]), "name": dept["name"]}
            for dept in departments
        ]
        return jsonify(departments_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Run the application
if __name__ == "__main__":
    app.run(debug=True, port=5000)
