const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

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
      if (error) {
        return res.json({
          success: false,
          compileError: stderr,
          tests: [],
        });
      }

      // ✅ TEST CASES (STATIC ANALYSIS)
      const tests = [
        {
          name: "LED pin is set as OUTPUT",
          pass: code.includes("pinMode(LED_BUILTIN, OUTPUT)")
        },
        {
          name: "LED is turned ON",
          pass: code.includes("digitalWrite(LED_BUILTIN, HIGH)")
        },
        {
          name: "LED is turned OFF",
          pass: code.includes("digitalWrite(LED_BUILTIN, LOW)")
        },
        {
          name: "Delay of 1000ms is used",
          pass: code.includes("delay(1000)")
        }
      ];

      res.json({
        success: true,
        compileMessage: "✅ Compilation successful",
        tests
      });
    }
  );
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
