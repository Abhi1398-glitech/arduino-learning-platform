import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🎬',
      title: 'Video Lessons',
      desc: 'Watch guided walkthroughs of every concept before you write a single line.',
    },
    {
      icon: '📖',
      title: 'Theory & Docs',
      desc: 'Understand the "why" behind every circuit and function call.',
    },
    {
      icon: '💻',
      title: 'In-Browser Editor',
      desc: 'Write real Arduino C++ code without leaving your browser.',
    },
    {
      icon: '✅',
      title: 'Auto-Graded Tests',
      desc: 'Get instant feedback through automated test cases on every submission.',
    },
  ];

  const stats = [
    { value: '1', label: 'Course' },
    { value: '4', label: 'Modules' },
    { value: '∞', label: 'Iterations' },
    { value: '0', label: 'Setup Required' },
  ];

  return (
    <main className="home page-enter">
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Now Live — Arduino Basics Course
          </div>

          <h1 className="hero-title">
            Learn Arduino{' '}
            <span className="hero-title-accent">In The Browser.</span>
          </h1>

          <p className="hero-subtitle">
            The fastest path from zero to blinking LED. Write real code,
            compile on a real backend, and see your test cases pass — all
            without touching a USB cable.
          </p>

          <div className="hero-actions">
            <Link to="/courses" className="btn-primary">
              <span>⚡</span> Start First Lesson
            </Link>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>

          {/* Code snippet decoration */}
          <div className="hero-code-preview">
            <div className="code-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="code-filename">blink.ino</span>
            </div>
            <pre className="code-body">
{`void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section className="stats-bar">
        <div className="section-container stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / GOAL ───────────────────────────────── */}
      <section id="about" className="about-section">
        <div className="section-container">
          <p className="section-label">Mission</p>
          <h2 className="section-title">
            Why Another<br />Learning Platform?
          </h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Most Arduino tutorials dump you on a YouTube video and leave you copy-pasting
                code with no idea if it actually works. We built this platform to close that gap.
              </p>
              <p>
                Every lesson has a built-in code editor connected to a real Arduino compiler.
                You write code, hit run, and see exactly which test cases pass or fail —
                with clear, human-readable error messages.
              </p>
              <p>
                No hardware required for learning the fundamentals. Just open a browser and start.
              </p>
            </div>
            <div className="about-features">
              {features.map((f) => (
                <div key={f.title} className="feature-card card">
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <h4 className="feature-title">{f.title}</h4>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES OVERVIEW ───────────────────────────── */}
      <section className="courses-overview-section">
        <div className="section-container">
          <p className="section-label">Curriculum</p>
          <h2 className="section-title">Available Courses</h2>

          <div className="course-card-featured card">
            <div className="course-card-badge tag">Beginner</div>
            <div className="course-card-body">
              <div className="course-card-meta mono">Module 01</div>
              <h3 className="course-card-title">Arduino Basics – LED Blinking</h3>
              <p className="course-card-desc">
                Your first Arduino sketch. Learn about setup(), loop(), pinMode(), and
                digitalWrite() while making an LED blink at your command. Includes
                video walkthrough, theory, and auto-graded code challenges.
              </p>
              <div className="course-card-tags">
                <span className="tag">4 Modules</span>
                <span className="tag">Arduino UNO</span>
                <span className="tag tag-orange">Compilation</span>
              </div>
            </div>
            <div className="course-card-action">
              <Link to="/courses/arduino-basics" className="btn-primary">
                Open Course →
              </Link>
            </div>
          </div>

          <p className="courses-coming-soon mono">
            {'// '} More courses coming soon — IoT, Sensors, Communication Protocols...
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="section-container footer-inner">
          <span className="footer-logo mono">{'<ArduinoLearn />'}</span>
          <p className="footer-copy">© 2025 Arduino Learning Platform. Built for learners.</p>
          <div className="footer-links">
            <Link to="/contact">Contact</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;