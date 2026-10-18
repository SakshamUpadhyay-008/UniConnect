import React from 'react';
import { X, ShieldCheck, Briefcase, GraduationCap, Sparkles, Send, CheckCircle2, Clock } from 'lucide-react';

export default function AlumniProfileModal({ alumnus, onClose, onRequestMentorship }) {
  if (!alumnus) return null;

  return (
    <div className="modal-backdrop-layer" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-dialog-card"
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close profile">
          <X size={18} />
        </button>

        {/* Profile Header */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '22px', marginBottom: '22px' }}>
          <img 
            src={alumnus.avatar} 
            alt={alumnus.name} 
            style={{ width: '84px', height: '84px', borderRadius: '22px', objectFit: 'cover', border: '3px solid rgba(216, 255, 98, 0.4)' }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 800 }}>
                {alumnus.name}
              </h3>
              <span style={{ 
                background: 'rgba(50, 197, 106, 0.15)', 
                color: 'var(--color-success)', 
                border: '1px solid rgba(50, 197, 106, 0.35)', 
                fontSize: '0.74rem', 
                fontWeight: 700, 
                padding: '2px 8px', 
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                IIIT Delhi Verified
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#cbd5e1', fontWeight: 600, marginTop: '4px' }}>
              {alumnus.role} • <span style={{ color: 'var(--accent-lime)' }}>{alumnus.company}</span>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontSize: '0.82rem', color: '#94a3b8', marginTop: '6px' }}>
              <span>{alumnus.degree}</span>
              <span>•</span>
              <span>{alumnus.location}</span>
            </div>
          </div>
        </div>

        {/* Why This Mentor Section per specification */}
        <div style={{ 
          background: 'rgba(216, 255, 98, 0.08)', 
          border: '1px solid rgba(216, 255, 98, 0.25)', 
          borderRadius: '16px', 
          padding: '16px 20px', 
          marginBottom: '22px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            <Sparkles size={15} />
            <span>Why This Mentor Matters For You</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.55 }}>
            {alumnus.matchReason}
          </p>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '8px' }}>
            About & Journey
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            {alumnus.bio}
          </p>
        </div>

        {/* Mentorship Topics */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '8px' }}>
            Mentorship & Guidance Topics
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alumnus.mentorshipTopics.map((topic, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#f1f5f9' }}>
                <CheckCircle2 size={15} color="var(--accent-lime)" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past Experience */}
        {alumnus.pastExperience && (
          <div style={{ marginBottom: '22px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '8px' }}>
              Past Career Experience
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {alumnus.pastExperience.map((exp, idx) => (
                <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.82rem' }}>
                  {exp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Domains */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '8px' }}>
            Skills & Technical Focus
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {alumnus.skills.map((skill, idx) => (
              <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600 }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action CTA */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
            <Clock size={15} color={alumnus.mentorshipAvailable ? 'var(--color-success)' : 'var(--color-warning)'} />
            <span style={{ color: alumnus.mentorshipAvailable ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 600 }}>
              {alumnus.mentorshipAvailable ? 'Accepting Mentorship Proposals' : 'Capacity Paused'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn-hero-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              type="button" 
              className="btn-hero-primary"
              disabled={!alumnus.mentorshipAvailable}
              style={{ opacity: alumnus.mentorshipAvailable ? 1 : 0.4 }}
              onClick={() => { onClose(); onRequestMentorship(alumnus); }}
            >
              <Send size={15} />
              <span>Request Introduction</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
