import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
    }
  } catch (err) {
    alert("Failed to send message");
  }

  setLoading(false);
};

  return (
    <main className="contact-page page-enter">
      <div className="section-container contact-container">
        {/* Header */}
        <div className="contact-header">
          <p className="section-label">Get in Touch</p>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have a question about the platform, found a bug, or want to suggest a new course?
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info sidebar */}
          <aside className="contact-info">
            <div className="info-card card">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value mono">team@arduinolearn.dev</span>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-item">
                <span className="info-icon">💬</span>
                <div>
                  <span className="info-label">Response time</span>
                  <span className="info-value">Within 24–48 hours</span>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-item">
                <span className="info-icon">🐛</span>
                <div>
                  <span className="info-label">Bug Reports</span>
                  <span className="info-value">Use the form with subject "Bug"</span>
                </div>
              </div>
            </div>

            <div className="faq-card card">
              <h3 className="faq-title">Quick FAQ</h3>
              {[
                { q: 'Is the platform free?', a: 'Yes — completely free during the prototype phase.' },
                { q: 'Do I need Arduino hardware?', a: 'No! You can write and compile code entirely in the browser.' },
                { q: 'How does compilation work?', a: 'Your code is sent to our Node.js backend running the Arduino CLI.' },
              ].map((item) => (
                <div key={item.q} className="faq-item">
                  <p className="faq-q">{item.q}</p>
                  <p className="faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Form */}
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-state card">
                <span className="success-icon">✅</span>
                <h2 className="success-title">Message Sent!</h2>
                <p className="success-desc">
                  Thanks for reaching out. We'll get back to you within 24–48 hours.
                </p>
                <button
                  className="btn-secondary"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form card" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-select"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Question</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="course">Course Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn-primary submit-btn" type="submit" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <>📨 Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;