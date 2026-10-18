import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, User, Lock, Mail } from 'lucide-react';

export default function AuthModal({ isOpen, initialMode = 'login', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('aarav.patel@iiitd.ac.in');
      setFullName('Aarav Patel');
    } else if (selectedRole === 'alumni') {
      setEmail('priya.sharma@alumni.iiitd.ac.in');
      setFullName('Priya Sharma');
    } else {
      setEmail('admin.affairs@iiitd.ac.in');
      setFullName('Prof. Sanjit Kaul');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    onLoginSuccess({
      email,
      fullName: fullName || (role === 'student' ? 'Aarav Patel' : 'Priya Sharma'),
      role
    });
    onClose();
  };

  return (
    <div className="modal-backdrop-layer" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close authentication modal">
          <X size={18} />
        </button>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
          <button 
            type="button"
            className={`filter-select ${mode === 'login' ? 'active' : ''}`}
            style={{ 
              background: mode === 'login' ? 'var(--accent-lime)' : 'transparent',
              color: mode === 'login' ? '#102345' : '#ffffff',
              fontWeight: 700 
            }}
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`filter-select ${mode === 'register' ? 'active' : ''}`}
            style={{ 
              background: mode === 'register' ? 'var(--accent-lime)' : 'transparent',
              color: mode === 'register' ? '#102345' : '#ffffff',
              fontWeight: 700 
            }}
            onClick={() => setMode('register')}
          >
            Create Account
          </button>
        </div>

        <h3 className="modal-title">
          {mode === 'login' ? 'Welcome to AlumBridge' : 'Join the IIIT Delhi Network'}
        </h3>
        <p className="modal-subtitle">
          {mode === 'login' 
            ? 'Sign in with your verified IIIT Delhi institutional account.' 
            : 'Register with your college email. Accounts are validated against institutional records.'}
        </p>

        {/* Role Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>
            Account Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {['student', 'alumni', 'facultyAdmin'].map((r) => (
              <button
                key={r}
                type="button"
                className="filter-select"
                style={{
                  background: role === r ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.05)',
                  color: role === r ? '#102345' : '#cbd5e1',
                  fontWeight: role === r ? 800 : 500,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  padding: '8px 0'
                }}
                onClick={() => setRole(r)}
              >
                {r === 'facultyAdmin' ? 'Faculty/Admin' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Instant Demo Autofill Bar */}
        <div style={{ background: 'rgba(216, 255, 98, 0.08)', border: '1px solid rgba(216, 255, 98, 0.2)', borderRadius: '12px', padding: '12px 14px', marginBottom: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-lime)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            ⚡ Instant Demo Login
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="btn-card-secondary" 
              style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={() => handleDemoFill('student')}
            >
              Aarav (Student)
            </button>
            <button 
              type="button" 
              className="btn-card-secondary" 
              style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={() => handleDemoFill('alumni')}
            >
              Priya (Alumna @ DeepMind)
            </button>
            <button 
              type="button" 
              className="btn-card-secondary" 
              style={{ fontSize: '0.76rem', padding: '4px 10px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={() => handleDemoFill('facultyAdmin')}
            >
              Dean Affairs (Admin)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Aarav Patel"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">IIIT Delhi Institutional Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. yourname@iiitd.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••••••"
              defaultValue="DemoSecurePass#2026"
              required
            />
          </div>

          <button type="submit" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
            <span>{mode === 'login' ? `Sign In as ${role}` : `Create ${role} Account`}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
