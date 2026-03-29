const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());



const MONGO_URL = "mongodb+srv://database:passwors8@cluster0.4gg5nap.mongodb.net/?appName=Cluster0";
const client = new MongoClient(MONGO_URL);

//let usersCollection;
let users;

async function connectDB() {

  try {

    await client.connect();

    const db = client.db("arduino-platform");

    users = db.collection("users");   // ⭐ assign here

    console.log("MongoDB connected");

  } catch (err) {

    console.error("MongoDB connection error:", err);

  }

}

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/compile", (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const folder = "sketch";
  const file = `${folder}/sketch.ino`;

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  fs.writeFileSync(file, code);

  exec(
    `arduino-cli compile --fqbn arduino:avr:uno ${folder}`,
    (error, stdout, stderr) => {

      // TEST CASES
      const testCases = [
        {
          key: "hasSetup",
          pass: code.includes("void setup")
        },
        {
          key: "hasLoop",
          pass: code.includes("void loop")
        },
        {
          key: "hasPinMode",
          pass: code.includes("pinMode(LED_BUILTIN, OUTPUT)")
        },
        {
          key: "hasToggle",
          pass:
            code.includes("digitalWrite(LED_BUILTIN, HIGH)") &&
            code.includes("digitalWrite(LED_BUILTIN, LOW)")
        },
        {
          key: "hasDelay",
          pass: code.includes("delay(")
        }
      ];

      if (error) {
        return res.json({
          success: false,
          error: stderr,
          testCases
        });
      }

      res.json({
        success: true,
        message: "Compilation successful",
        testCases
      });
    }
  );
});

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("Contact form received:");
  console.log({ name, email, subject, message });

  res.json({
    success: true,
    message: "Message received"
  });
});

app.post("/signup", async (req, res) => {

  const { email, password } = req.body;

  const existing = await users.findOne({ email });

  if (existing) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  await users.insertOne({
    email,
    password
  });

  res.json({
    success: true,
    message: "Account created"
  });

});

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await users.findOne({
    email,
    password
  });

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials"
    });
  }

  res.json({
    success: true,
    message: "Login successful"
  });

});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
