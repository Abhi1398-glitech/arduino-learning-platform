import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './CourseDetail.css';

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSE_DATA = {
  'arduino-basics': {
    title: 'Arduino Basics – LED Blinking',
    description: 'Learn to control digital output and blink your first LED using Arduino.',
    modules: [
      {
        id: 'video',
        label: '01 · Video',
        icon: '🎬',
        title: 'Watch the Walkthrough',
      },
      {
        id: 'theory',
        label: '02 · Theory',
        icon: '📖',
        title: 'Understanding the Concepts',
      },
      {
        id: 'code',
        label: '03 · Code',
        icon: '💻',
        title: 'Write & Test Your Code',
      },
    ],
  },
};

const STARTER_CODE = `// Arduino Basics: LED Blink
// Goal: Make the built-in LED blink every second

void setup() {
  // Put your setup code here — runs once
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // Put your main code here — runs repeatedly
  digitalWrite(LED_BUILTIN, HIGH);  // Turn LED on
  delay(1000);                       // Wait 1 second
  digitalWrite(LED_BUILTIN, LOW);   // Turn LED off
  delay(1000);                       // Wait 1 second
}
`;

// ─── Sub-components ───────────────────────────────────────────────────────────
const VideoModule = () => (
  <div className="module-content page-enter">
    <h2 className="module-heading">Watch the Walkthrough</h2>
    <p className="module-desc">
      Start with this video to understand how digital output works on the Arduino UNO
      and why the LED_BUILTIN constant is so useful.
    </p>
    <div className="video-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/fCxzA9_kg6s"
        title="Arduino Blink Tutorial"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="video-notes card">
      <p className="section-label">Key takeaways</p>
      <ul className="key-points">
        <li>Every Arduino sketch needs <code>setup()</code> and <code>loop()</code></li>
        <li><code>pinMode()</code> configures a pin as INPUT or OUTPUT</li>
        <li><code>LED_BUILTIN</code> refers to the onboard LED (pin 13 on UNO)</li>
        <li><code>delay(ms)</code> pauses execution for the given milliseconds</li>
      </ul>
    </div>
  </div>
);

const TheoryModule = () => (
  <div className="module-content page-enter">
    <h2 className="module-heading">Understanding the Concepts</h2>

    <div className="theory-block">
      <h3 className="theory-subtitle">The Anatomy of an Arduino Sketch</h3>
      <p className="theory-text">
        Every Arduino program (called a <em>sketch</em>) is structured around two core functions.
        <code>setup()</code> runs exactly <strong>once</strong> when the board is powered on or reset,
        while <code>loop()</code> runs <strong>continuously</strong> until power is removed.
      </p>
      <div className="theory-code-block">
        <div className="code-header">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="code-filename">anatomy.ino</span>
        </div>
        <pre>{`void setup() {
  // Runs once — configure pins, start Serial, etc.
}

void loop() {
  // Runs forever — your main program logic
}`}</pre>
      </div>
    </div>

    <div className="theory-block">
      <h3 className="theory-subtitle">Digital Output & Voltage</h3>
      <p className="theory-text">
        Digital pins on the Arduino can output either 5V (HIGH) or 0V (LOW).
        When we call <code>pinMode(pin, OUTPUT)</code>, we tell the microcontroller
        that we want to control voltage on that pin. Calling
        <code>digitalWrite(LED_BUILTIN, HIGH)</code> pushes 5V to the pin, lighting up the LED.
      </p>
      <div className="theory-table-wrapper">
        <table className="theory-table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>pinMode(pin, mode)</code></td>
              <td>Set pin direction</td>
              <td><code>pinMode(13, OUTPUT)</code></td>
            </tr>
            <tr>
              <td><code>digitalWrite(pin, val)</code></td>
              <td>Write HIGH or LOW</td>
              <td><code>digitalWrite(13, HIGH)</code></td>
            </tr>
            <tr>
              <td><code>delay(ms)</code></td>
              <td>Pause for N milliseconds</td>
              <td><code>delay(500)</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="theory-block">
      <h3 className="theory-subtitle">LED_BUILTIN Constant</h3>
      <p className="theory-text">
        Instead of hardcoding pin 13, Arduino provides the constant <code>LED_BUILTIN</code>
        which resolves to the correct built-in LED pin for whatever board you're using.
        This makes your code more portable across different Arduino models.
      </p>
    </div>
  </div>
);

const CodeModule = () => {
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const testCases = output?.testCases || [];

  const runCode = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.post("http://localhost:5000/compile", {
  code: code
});

setOutput({
  success: res.data.success,
  message: res.data.message,
  testCases: res.data.testCases || []
});
    } catch (err) {
      setOutput({
        success: false,
        error: err.response?.data?.error || 'Server unreachable. Make sure the backend is running.',
        testCases: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-content code-module page-enter">
      <h2 className="module-heading">Write & Test Your Code</h2>
      <p className="module-desc">
        Write your Arduino sketch below. Hit <strong>Compile & Run</strong> to send it
        to the backend compiler and see which test cases pass.
      </p>

      {/* Editor */}
      <div className="editor-wrapper">
        <div className="editor-header">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="code-filename">sketch.ino</span>
          <span className="editor-board-badge mono">Board: Arduino UNO</span>
        </div>
        <Editor
          height="360px"
          defaultLanguage="cpp"
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Run button */}
      <div className="editor-actions">
        <button
          className="btn-primary run-btn"
          onClick={runCode}
          disabled={loading}
        >
          {loading ? (
            <><span className="spinner" /> Compiling...</>
          ) : (
            <><span>▶</span> Compile & Run</>
          )}
        </button>
        <button
          className="btn-secondary"
          onClick={() => { setCode(STARTER_CODE); setOutput(null); }}
        >
          ↺ Reset Code
        </button>
      </div>

      {/* Output panel */}
      {output && (
        <div className={`output-panel ${output.success ? 'output-success' : 'output-error'}`}>
          <div className="output-header">
            <span className="output-status-icon">
              {output.success ? '✅' : '❌'}
            </span>
            <span className="output-status-text">
              {output.success ? 'Compilation Successful' : 'Compilation Failed'}
            </span>
          </div>
          {output.error && (
            <pre className="output-error-text">{output.error}</pre>
          )}
          {output.message && (
            <pre className="output-message">{output.message}</pre>
          )}
        </div>
      )}

      {/* Test cases */}
      <div className="test-cases-section">
        <h3 className="test-cases-heading">
          <span className="section-label" style={{ marginBottom: 0 }}>Test Cases</span>
        </h3>

        <div className="test-cases-list">
          {[
            { id: 1, label: 'setup() function is defined', key: 'hasSetup' },
            { id: 2, label: 'loop() function is defined', key: 'hasLoop' },
            { id: 3, label: 'Uses pinMode(LED_BUILTIN, OUTPUT)', key: 'hasPinMode' },
            { id: 4, label: 'Toggles LED HIGH and LOW', key: 'hasToggle' },
            { id: 5, label: 'Uses delay() for timing', key: 'hasDelay' },
          ].map((tc) => {
            const result = testCases.find((t) => t.key === tc.key);
            const status = result ? (result.pass ? 'pass' : 'fail') : 'pending';
            return (
              <div key={tc.id} className={`test-case-row tc-${status}`}>
                <span className="tc-icon">
                  {status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⬜'}
                </span>
                <span className="tc-label mono">{tc.label}</span>
                <span className={`tc-badge tc-badge-${status}`}>
                  {status === 'pending' ? 'pending' : status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CourseDetail = () => {
  const { courseId } = useParams();
  const course = COURSE_DATA[courseId];
  const [activeModule, setActiveModule] = useState('video');

  if (!course) {
    return (
      <div className="not-found page-enter">
        <h2>Course not found</h2>
        <Link to="/courses" className="btn-primary">← Back to Courses</Link>
      </div>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'video': return <VideoModule />;
      case 'theory': return <TheoryModule />;
      case 'code': return <CodeModule />;
      default: return null;
    }
  };

  return (
    <main className="course-detail-page page-enter">
      <div className="course-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb mono">
          <Link to="/courses">Courses</Link>
          <span> / </span>
          <span>{course.title}</span>
        </div>

        {/* Header */}
        <div className="course-detail-header">
          <h1 className="course-detail-title">{course.title}</h1>
          <p className="course-detail-desc">{course.description}</p>
        </div>

        {/* Module tabs */}
        <div className="module-tabs">
          {course.modules.map((mod) => (
            <button
              key={mod.id}
              className={`module-tab ${activeModule === mod.id ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
            >
              <span className="module-tab-icon">{mod.icon}</span>
              <span className="module-tab-label">{mod.label}</span>
            </button>
          ))}
        </div>

        {/* Module content */}
        <div className="module-panel">
          {renderModule()}
        </div>

        {/* Navigation */}
        <div className="module-nav">
          {course.modules.findIndex((m) => m.id === activeModule) > 0 && (
            <button
              className="btn-secondary"
              onClick={() => {
                const idx = course.modules.findIndex((m) => m.id === activeModule);
                setActiveModule(course.modules[idx - 1].id);
              }}
            >
              ← Previous
            </button>
          )}
          {course.modules.findIndex((m) => m.id === activeModule) < course.modules.length - 1 && (
            <button
              className="btn-primary"
              onClick={() => {
                const idx = course.modules.findIndex((m) => m.id === activeModule);
                setActiveModule(course.modules[idx + 1].id);
              }}
              style={{ marginLeft: 'auto' }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;