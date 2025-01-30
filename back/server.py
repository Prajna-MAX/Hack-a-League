import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "your_secret_key") 
CORS(app, supports_credentials=True)  
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://root:root@hack-a-league.beala.mongodb.net/?retryWrites=true&w=majority&appName=hack-a-league")
client = MongoClient(MONGO_URI)
db = client["db"]
users_collection = db["users"]

@app.route("/")
def home():
    return jsonify({"message": "Server Running"}), 200

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

# WebSocket Event
@socketio.on("message")
def handle_message(message):
    print(f"Received message: {message}")
    socketio.send(f"Echo: {message}")

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
