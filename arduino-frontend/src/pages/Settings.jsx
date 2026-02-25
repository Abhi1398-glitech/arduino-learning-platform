import React, { useState } from 'react';
import './Settings.css';

const ToggleSwitch = ({ checked, onChange, label, desc }) => (
  <label className="toggle-row">
    <div className="toggle-info">
      <span className="toggle-label">{label}</span>
      {desc && <span className="toggle-desc">{desc}</span>}
    </div>
    <div
      className={`toggle-switch ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onChange(!checked)}
    >
      <span className="toggle-thumb" />
    </div>
  </label>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    compileOnSave: false,
    showLineNumbers: true,
    wordWrap: false,
    fontSize: '13',
    theme: 'vs-dark',
    backendUrl: 'http://localhost:5000',
  });

  const update = (key, val) => setSettings((s) => ({ ...s, [key]: val }));

  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="settings-page page-enter">
      <div className="section-container settings-container">
        <div className="settings-header">
          <p className="section-label">Configuration</p>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Customize your learning environment.</p>
        </div>

        {/* Editor Settings */}
        <section className="settings-group card">
          <h2 className="group-title">⚙️ Editor Preferences</h2>

          <ToggleSwitch
            label="Show Line Numbers"
            desc="Display line numbers in the code editor."
            checked={settings.showLineNumbers}
            onChange={(v) => update('showLineNumbers', v)}
          />
          <div className="settings-divider" />
          <ToggleSwitch
            label="Word Wrap"
            desc="Wrap long lines instead of scrolling horizontally."
            checked={settings.wordWrap}
            onChange={(v) => update('wordWrap', v)}
          />
          <div className="settings-divider" />

          <div className="settings-field">
            <label className="field-label">Font Size</label>
            <select
              className="field-select"
              value={settings.fontSize}
              onChange={(e) => update('fontSize', e.target.value)}
            >
              {['11', '12', '13', '14', '16'].map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </div>
          <div className="settings-divider" />

          <div className="settings-field">
            <label className="field-label">Editor Theme</label>
            <select
              className="field-select"
              value={settings.theme}
              onChange={(e) => update('theme', e.target.value)}
            >
              <option value="vs-dark">VS Dark</option>
              <option value="vs-light">VS Light</option>
              <option value="hc-black">High Contrast</option>
            </select>
          </div>
        </section>

        {/* Compiler settings */}
        <section className="settings-group card">
          <h2 className="group-title">🔧 Compiler & Backend</h2>

          <ToggleSwitch
            label="Auto-Save Code"
            desc="Automatically save your code as you type."
            checked={settings.autoSave}
            onChange={(v) => update('autoSave', v)}
          />
          <div className="settings-divider" />
          <ToggleSwitch
            label="Compile on Save"
            desc="Trigger compilation automatically when code is saved."
            checked={settings.compileOnSave}
            onChange={(v) => update('compileOnSave', v)}
          />
          <div className="settings-divider" />

          <div className="settings-field">
            <label className="field-label">Backend URL</label>
            <input
              className="field-input"
              type="text"
              value={settings.backendUrl}
              onChange={(e) => update('backendUrl', e.target.value)}
              placeholder="http://localhost:5000"
            />
            <span className="field-hint mono">
              Make sure the backend is running at this address.
            </span>
          </div>
        </section>

        {/* About section */}
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

        {/* Save button */}
        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✅ Saved!' : '💾 Save Settings'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Settings;