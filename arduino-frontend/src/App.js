import { useState } from "react";

function App() {
  const [code, setCode] = useState(
`void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`
  );

  const [result, setResult] = useState("");
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const compileCode = async () => {
    setLoading(true);
    setResult("");
    setTests([]);

    try {
      const res = await fetch("http://localhost:3001/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!data.success) {
        setResult("❌ Compilation failed");
        setResult(data.compileError);
      } else {
        setResult(data.compileMessage);
        setTests(data.tests);
      }
    } catch {
      setResult("❌ Backend not reachable");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Arduino Code Compiler</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={14}
        cols={70}
        style={{ fontFamily: "monospace", fontSize: "14px" }}
      />

      <br /><br />

      <button onClick={compileCode} disabled={loading}>
        {loading ? "Compiling..." : "Compile & Test"}
      </button>

      <h3>Result</h3>
      <pre>{result}</pre>

      {tests.length > 0 && (
        <>
          <h3>Test Cases</h3>
          <ul>
            {tests.map((t, i) => (
              <li key={i} style={{ color: t.pass ? "green" : "red" }}>
                {t.pass ? "✅" : "❌"} {t.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
