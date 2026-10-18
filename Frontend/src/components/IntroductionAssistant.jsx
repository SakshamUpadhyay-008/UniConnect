import React, { useState } from 'react';
import { MessageSquareText, Copy, Check, Sparkles, Send } from 'lucide-react';
import { ALUMNI_DATA } from '../data/alumniData';

export default function IntroductionAssistant({ onSendGeneratedMessage }) {
  const [selectedAlumId, setSelectedAlumId] = useState(ALUMNI_DATA[0].id);
  const [reason, setReason] = useState('Seeking advice on research roadmap and preparing our first conference paper');
  const [careerGoal, setCareerGoal] = useState('AI & Machine Learning Research');
  const [tone, setTone] = useState('Professional');
  const [copied, setCopied] = useState(false);

  const selectedAlumnus = ALUMNI_DATA.find(a => a.id === selectedAlumId) || ALUMNI_DATA[0];

  // Deterministic personalized message generator
  const generateMessage = () => {
    if (tone === 'Concise') {
      return `Dear ${selectedAlumnus.name},

I am a student at IIIT Delhi pursuing ${careerGoal}. I noticed your work at ${selectedAlumnus.company} after graduating from the ${selectedAlumnus.degree}. 

I am currently ${reason}. Could I request 15 minutes of your guidance or an async review of my roadmap?

Thank you for supporting the IIIT Delhi student community!
Best regards,
Aarav Patel (3rd Year B.Tech CSE, IIIT Delhi)`;
    }

    if (tone === 'Friendly') {
      return `Hi ${selectedAlumnus.name}!

Hope you're doing well! I'm a pre-final year student at IIIT Delhi, deeply interested in ${careerGoal}. It was super inspiring to see your journey to ${selectedAlumnus.company} from our campus.

I am reaching out because I am currently ${reason}. Since you navigated the exact same labs and transitions, your perspective would mean a lot to me.

Would you be open to a brief async chat or 15-minute discussion when convenient? 

Thanks a lot for giving back to IIIT Delhi!
Cheers,
Aarav Patel`;
    }

    // Default: Professional
    return `Dear ${selectedAlumnus.name},

I hope this message finds you well. I am a pre-final year student at IIIT Delhi with a keen focus on ${careerGoal}. I came across your profile through AlumBridge and was inspired by your career journey at ${selectedAlumnus.company} following your ${selectedAlumnus.degree} at IIIT Delhi.

I am currently ${reason}. Having walked this path from our institute, I would deeply value your advice on how to navigate these next steps effectively.

I would be grateful for the opportunity to connect for a 15-to-20 minute discussion or receive your feedback asynchronously at your convenience.

Thank you very much for your time and continued support of our IIITD community.

Warm regards,
Aarav Patel
3rd Year B.Tech CSE, IIIT Delhi`;
  };

  const [editableText, setEditableText] = useState(generateMessage());

  // Update text when form inputs change
  const handleAlumChange = (id) => {
    setSelectedAlumId(id);
    const newAlum = ALUMNI_DATA.find(a => a.id === id);
    if (newAlum) {
      setTimeout(() => setEditableText(generateMessage()), 50);
    }
  };

  const handleToneChange = (newTone) => {
    setTone(newTone);
    setTimeout(() => setEditableText(generateMessage()), 50);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="assistant-section" id="message-assistant">
      <div className="content-container">
        <div className="assistant-card">
          {/* Left Side: Form Controls */}
          <div>
            <div className="hero-eyebrow-container">
              <MessageSquareText size={14} />
              <span>Smart Introduction Assistant</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Make Your First Message Count
            </h2>
            <p style={{ color: 'var(--text-secondary-dark)', fontSize: '0.95rem', marginBottom: '24px' }}>
              First impressions matter. Generate a thoughtful, respectful proposal customized to the alumnus's background and your target ambition.
            </p>

            <div className="form-group">
              <label className="form-label">Select Target Alumnus</label>
              <select 
                className="form-select"
                value={selectedAlumId}
                onChange={(e) => handleAlumChange(e.target.value)}
              >
                {ALUMNI_DATA.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.role} @ {a.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Primary Career Ambition</label>
              <input 
                type="text"
                className="form-input"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reason For Reaching Out</label>
              <input 
                type="text"
                className="form-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            {/* Tone Selector */}
            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label">Preferred Message Tone</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Professional', 'Friendly', 'Concise'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="filter-select"
                    style={{
                      background: tone === t ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.05)',
                      color: tone === t ? '#102345' : '#cbd5e1',
                      fontWeight: tone === t ? 800 : 500,
                      textAlign: 'center',
                      padding: '8px 0'
                    }}
                    onClick={() => handleToneChange(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Generated Output Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-lime)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Editable Proposal Draft
                </span>

                <button 
                  type="button"
                  onClick={handleCopy}
                  style={{
                    background: copied ? 'rgba(50, 197, 106, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    color: copied ? 'var(--color-success)' : '#ffffff',
                    border: copied ? '1px solid var(--color-success)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: '0.15s ease'
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>
              </div>

              <textarea 
                rows={13}
                className="form-textarea"
                style={{ width: '100%', resize: 'vertical', fontSize: '0.86rem', lineHeight: 1.6 }}
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
              />

              <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '8px' }}>
                * Deterministic template generated from public IIITD profile records. Review and personalize before sending.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                type="button"
                className="btn-hero-primary"
                onClick={() => onSendGeneratedMessage(selectedAlumnus, editableText)}
              >
                <span>Send to {selectedAlumnus.name}</span>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
