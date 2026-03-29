import React, { useState, useEffect } from "react";
import "./Settings.css";

const ToggleSwitch = ({ checked, onChange, label, desc }) => (
  <label className="toggle-row">
    <div className="toggle-info">
      <span className="toggle-label">{label}</span>
      {desc && <span className="toggle-desc">{desc}</span>}
    </div>

    <div
      className={`toggle-switch ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle-thumb" />
    </div>
  </label>
);

const defaultSettings = {
  darkMode: true,
  autoSave: true,
  showLineNumbers: true,
  wordWrap: false,
  fontSize: "13",
  theme: "vs-dark"
};

const Settings = () => {

  /* ---------------- SETTINGS ---------------- */

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("editorSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const update = (key, val) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);

    if (settings.autoSave) {
      localStorage.setItem("editorSettings", JSON.stringify(newSettings));
    }
  };

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("editorSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [settings.darkMode]);

  /* ---------------- AUTH ---------------- */

  const [mode, setMode] = useState("login"); // login or signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [msg, setMsg] = useState("");

  const login = async () => {

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      setLoggedIn(true);
      setMsg("✅ Logged in");
    } else {
      setMsg("❌ Invalid credentials");
    }
  };

  const signup = async () => {

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      setMsg("✅ Account created! Now login.");
      setMode("login");
    } else {
      setMsg("❌ User already exists");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setMsg("");
  };

  return (
    <main className="settings-page page-enter">
      <div className="section-container settings-container">

        <div className="settings-header">
          <p className="section-label">Configuration</p>
          <h1 className="settings-title">Settings</h1>
        </div>

        {/* AUTH SECTION */}

        <section className="settings-group card">

          <h2 className="group-title">🔐 Account</h2>

          {!loggedIn ? (

            <>
              <div className="settings-field">
                <label>Email</label>
                <input
                  className="field-input"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="settings-field">
                <label>Password</label>
                <input
                  className="field-input"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              {mode === "login" ? (

                <>
                  <button className="btn-primary" onClick={login}>
                    Login
                  </button>

                  <p>
                    No account?{" "}
                    <span
                      style={{cursor:"pointer",color:"#4da3ff"}}
                      onClick={()=>setMode("signup")}
                    >
                      Sign up
                    </span>
                  </p>
                </>

              ) : (

                <>
                  <button className="btn-primary" onClick={signup}>
                    Create Account
                  </button>

                  <p>
                    Already have an account?{" "}
                    <span
                      style={{cursor:"pointer",color:"#4da3ff"}}
                      onClick={()=>setMode("login")}
                    >
                      Login
                    </span>
                  </p>
                </>

              )}

              {msg && <p style={{marginTop:"10px"}}>{msg}</p>}
            </>

          ) : (

            <>
              <p>✅ Logged in as <b>{email}</b></p>
              <button className="btn-secondary" onClick={logout}>
                Logout
              </button>
            </>

          )}

        </section>

        {/* EDITOR SETTINGS */}

        <section className="settings-group card">

          <h2 className="group-title">⚙️ Editor Preferences</h2>

          <ToggleSwitch
            label="Dark Mode"
            checked={settings.darkMode}
            onChange={(v)=>update("darkMode",v)}
          />

          <ToggleSwitch
            label="Auto Save"
            checked={settings.autoSave}
            onChange={(v)=>update("autoSave",v)}
          />

          <ToggleSwitch
            label="Show Line Numbers"
            checked={settings.showLineNumbers}
            onChange={(v)=>update("showLineNumbers",v)}
          />

          <ToggleSwitch
            label="Word Wrap"
            checked={settings.wordWrap}
            onChange={(v)=>update("wordWrap",v)}
          />

        </section>


        <section className="settings-group card">
          <h2 className="group-title">ℹ️ About</h2>
          <div className="about-info">
            <div className="about-row">
              <span className="about-key mono">Platform</span>
              <span className="about-val">Arduino Learning Platform</span>
            </div>
            <div className="about-row">
              <span className="about-key mono">Version</span>
              <span className="about-val">1.0.0 · Prototype</span>
            </div>
            <div className="about-row">
              <span className="about-key mono">Framework</span>
              <span className="about-val">React (CRA)</span>
            </div>
            <div className="about-row">
              <span className="about-key mono">Backend</span>
              <span className="about-val">Node.js + Express + Arduino CLI</span>
            </div>
          </div>
        </section>

        

        {/* SAVE BUTTON */}

        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? "✅ Saved!" : "💾 Save Settings"}
          </button>
        </div>

      </div>
    </main>
  );
};

export default Settings;