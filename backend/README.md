- Arduino Online Compiler Platform (Docker + Node + Arduino CLI + MongoDB)

- A web backend that allows users to submit Arduino code, compile it using Arduino CLI inside Docker, and receive automated test-case feedback — with user authentication and contact storage using MongoDB.

- This project simulates an online Arduino IDE / coding practice platform.

✨ Features
🔧 Compile Arduino .ino code using Arduino CLI
🧪 Automatic test-case validation on submitted code
🐳 Fully containerized with Docker
🌐 REST API built with Express.js
🗄 MongoDB integration for users & contact messages
🔐 Basic authentication (Signup/Login)
📬 Contact form storage
⚡ Ready to plug into any frontend (React, Vue, etc.)
----

- 🏗 Tech Stack
Node.js + Express
Arduino CLI
MongoDB Atlas
Docker
CORS + JSON APIs
-----

- 📁 Project Structure
.
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
├── Dockerfile
├── docker-compose.yml

🐳 Docker Setup (Recommended)
- 1️⃣ Clone the repository
- git clone https://github.com/your-username/arduino-online-compiler.git
- cd arduino-online-compiler

- 2️⃣ Run with Docker Compose
- docker-compose up --build

- Server will run on:

http://localhost:5000
⚙️ How It Works
User sends Arduino code to /compile
Backend writes it to sketch/sketch.ino
Arduino CLI compiles it inside the container
Backend runs test-case checks on the code
JSON response returned with:
Compilation result
Test-case results
📡 API Endpoints
🔹 Health Check
GET /
🔹 Compile Arduino Code
POST /compile

Body:

{
  "code": "void setup() { ... }"
}

Response:

{
  "success": true,
  "message": "Compilation successful",
  "testCases": [
    { "key": "hasSetup", "pass": true },
    { "key": "hasLoop", "pass": true }
  ]
}
🔹 Signup
POST /signup
{
  "email": "user@mail.com",
  "password": "123456"
}
🔹 Login
POST /login
🔹 Contact Form
POST /contact

Stores message into MongoDB.

🧪 Test Cases Checked During Compile

The backend automatically verifies if the code contains:

void setup()
void loop()
pinMode(LED_BUILTIN, OUTPUT)
digitalWrite HIGH/LOW
delay()
🛠 Dockerfile Highlights

The container:

Installs Arduino CLI
Installs Arduino AVR core
Runs Node server
Compiles Arduino sketches inside container
🗄 MongoDB

Uses MongoDB Atlas for:

Users collection
Contacts collection

📜 License

MIT License
