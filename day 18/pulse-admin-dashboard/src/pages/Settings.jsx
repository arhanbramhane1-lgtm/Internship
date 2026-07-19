import React, { useState } from 'react';
import { FiCamera, FiSave, FiLogOut, FiLock } from 'react-icons/fi';
import '../styles/settings.css';
import '../styles/cards.css';

const Settings = () => {
  // Local Profile Configuration State
  const [profileName, setProfileName] = useState('Arhan Bramhane');
  const [profileEmail, setProfileEmail] = useState('arhan@pulse.io');
  const [profileRole, setProfileRole] = useState('SaaS Architect');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 234-5678');
  
  // Custom Interface Switches State
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Settings successfully synchronized! All changes saved to system memory.');
  };

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to log out of Pulse Admin Dashboard?');
    if (confirm) {
      alert('Mock Logout successful! Session closed.');
    }
  };

  return (
    <div className="settings-container animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800' }}>
          Pulse Control Center
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Update profile settings, coordinate email routing parameters, and configure API endpoints.
        </p>
      </div>

      <div className="settings-grid">
        {/* Left Side: General Profile Card & Custom Switches */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Profile Form Card */}
          <section className="card">
            <h3 className="card-title" style={{ marginBottom: '24px' }}>Profile Details</h3>
            
            <div className="settings-profile-header">
              <div className="profile-avatar-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Avatar Upload" 
                  className="profile-avatar-large"
                />
                <button 
                  className="profile-avatar-badge" 
                  onClick={() => alert('Mock File Upload dialog opened.')}
                  title="Upload New Profile Picture"
                  aria-label="Upload New Profile Picture"
                >
                  <FiCamera />
                </button>
              </div>
              
              <div className="profile-info-heading">
                <span className="profile-name">{profileName}</span>
                <span className="profile-role">{profileRole} • Workspace Owner</span>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="settings-form-grid">
              <div className="settings-input-group">
                <label className="settings-label">Full Display Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </div>

              <div className="settings-input-group">
                <label className="settings-label">Account Routing Email</label>
                <input 
                  type="email" 
                  className="settings-input" 
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  required
                />
              </div>

              <div className="settings-input-group">
                <label className="settings-label">Occupational Role</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                />
              </div>

              <div className="settings-input-group">
                <label className="settings-label">Contact Phone</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                />
              </div>

              {/* Form Buttons */}
              <div className="form-actions" style={{ gridColumn: 'span 2' }}>
                <button type="button" className="btn-secondary" onClick={() => {
                  setProfileName('Arhan Bramhane');
                  setProfileEmail('arhan@pulse.io');
                  setProfileRole('SaaS Architect');
                  setProfilePhone('+1 (555) 234-5678');
                }}>
                  Reset Changes
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <FiSave />
                  <span>Synchronize</span>
                </button>
              </div>
            </form>
          </section>

          {/* Interface & Notifications Control Panel */}
          <section className="card">
            <h3 className="card-title" style={{ marginBottom: '24px' }}>Platform Configurations</h3>
            
            <div className="settings-options-list">
              {/* Dark Theme toggle */}
              <div className="settings-option-item">
                <div className="settings-option-info">
                  <span className="settings-option-title">Lock Dark Theme Mode</span>
                  <span className="settings-option-desc">Maintain high-contrast visual display aesthetics optimized for developer eye health.</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={(e) => {
                      setDarkMode(e.target.checked);
                      alert("Pulse styling templates require Dark mode layout variables. Locking theme active.");
                      setDarkMode(true); // force keep dark
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Email Notifications toggle */}
              <div className="settings-option-item">
                <div className="settings-option-info">
                  <span className="settings-option-title">Email Analytics Digests</span>
                  <span className="settings-option-desc">Receive scheduled platform metrics, automated database alerts, and user action logs.</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Push Notifications toggle */}
              <div className="settings-option-item">
                <div className="settings-option-info">
                  <span className="settings-option-title">In-App Banner Notifications</span>
                  <span className="settings-option-desc">Display real-time user registrations and server backup indicators via notification center.</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* System Language Selector */}
              <div className="settings-option-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="settings-option-info">
                  <span className="settings-option-title">Localization Settings</span>
                  <span className="settings-option-desc">Select display translation language context for data formats and numeric readouts.</span>
                </div>
                <div style={{ width: '160px' }}>
                  <select 
                    className="settings-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="en">English (US)</option>
                    <option value="es">Español (ES)</option>
                    <option value="fr">Français (FR)</option>
                    <option value="de">Deutsch (DE)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: App Details & Session Logout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* About Section */}
          <section className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>System Diagnostics</h3>
            <div className="about-section">
              <div className="about-row">
                <span className="about-label">Application:</span>
                <span className="about-val">Pulse Admin Dashboard</span>
              </div>
              <div className="about-row">
                <span className="about-label">Version:</span>
                <span className="about-val">v1.2.0 (Stable)</span>
              </div>
              <div className="about-row">
                <span className="about-label">Environment:</span>
                <span className="about-val">Production Mock</span>
              </div>
              <div className="about-row">
                <span className="about-label">React Engine:</span>
                <span className="about-val">v19.2.7</span>
              </div>
              <div className="about-row">
                <span className="about-label">Bundler Tool:</span>
                <span className="about-val">Vite v8.1.1</span>
              </div>
              <div className="about-row" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '8px' }}>
                <span className="about-label">Router Handler:</span>
                <span className="about-val">React-Router v6</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <FiLock />
                <span>Encrypted connection verified.</span>
              </div>
            </div>
          </section>

          {/* Quick Actions / Logout Card */}
          <section className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.01)' }}>
            <h3 className="card-title" style={{ marginBottom: '12px', color: 'var(--danger-color)' }}>Danger Zone</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
              Warning: Terminating session logs you out of active client caches. Verify backups before logging out.
            </p>
            <button 
              className="btn-danger-outline"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>Log out Session</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
