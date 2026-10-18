import React, { useState } from 'react';
import { X, Send, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MentorshipRequestModal({ alumnus, initialNote, onClose, onSubmitRequest }) {
  const [topic, setTopic] = useState(alumnus?.mentorshipTopics?.[0] || 'Career Guidance & Strategy');
  const [format, setFormat] = useState('Async Review + 20-min Call');
  const [note, setNote] = useState(
    initialNote || 
    `Hi ${alumnus?.name || 'there'}! I am a 3rd-year B.Tech student at IIIT Delhi. I would love 15 minutes of guidance on how you approached your transition to ${alumnus?.company || 'industry'} and how I should position my upcoming projects.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!alumnus) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) {
      alert('Please write a brief note explaining what you want guidance on.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRequest = {
        id: `req_${Date.now()}`,
        studentName: 'Aarav Patel',
        studentDegree: '3rd Year B.Tech CSE, IIIT Delhi',
        alumniId: alumnus.id,
        alumniName: alumnus.name,
        alumniCompany: alumnus.company,
        alumniRole: alumnus.role,
        subject: topic,
        message: note,
        preferredFormat: format,
        status: 'pending',
        timestamp: 'Just now'
      };

      onSubmitRequest(newRequest);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 500);
  };

  return (
    <div className="modal-backdrop-layer" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close request modal">
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: '#EBFEE2', 
              color: '#16A34A', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 18px auto',
              boxShadow: '0 0 24px rgba(50, 197, 106, 0.4)'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
              Request Sent to {alumnus.name}!
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto' }}>
              Your mentorship proposal has been submitted. Status is now set to <strong>Pending</strong>. You will be notified as soon as {alumnus.name} responds.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', marginBottom: '8px' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Mutual Consent Mentorship
              </span>
            </div>

            <h3 className="modal-title">
              Request Mentorship with {alumnus.name}
            </h3>
            <p className="modal-subtitle">
              {alumnus.role} @ <strong>{alumnus.company}</strong> ({alumnus.degree})
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Mentorship Topic *</label>
                <select 
                  className="form-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {alumnus.mentorshipTopics.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                  <option value="General Career Guidance & Transition">General Career Guidance & Placement Strategy</option>
                  <option value="Resume & Portfolio Roast">Resume & Portfolio Roast</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Format</label>
                <select 
                  className="form-select"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="Async Review + 20-min Call">Async Review + 20-min Call</option>
                  <option value="Async Q&A Messaging">Async Q&A Messaging</option>
                  <option value="15-min Coffee Chat">15-minute 1:1 Video Coffee Chat</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Personal Message & Specific Questions *</label>
                <textarea 
                  rows={5}
                  className="form-textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Introduce yourself, your current branch, and specific questions you would like advice on..."
                  required
                />
              </div>

              <div style={{ background: 'rgba(5, 11, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-lime)', fontWeight: 700, marginBottom: '2px' }}>
                  <ShieldCheck size={14} />
                  <span>Respectful Alumni Engagement</span>
                </div>
                Messaging channels unlock only upon voluntary acceptance by the alumnus, keeping mentorship meaningful and spam-free.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn-hero-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-hero-primary" disabled={isSubmitting}>
                  <Send size={15} />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Proposal'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
