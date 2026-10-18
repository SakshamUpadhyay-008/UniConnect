import React from 'react';
import { Target, Compass, Send, Sparkles, Trophy } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Set a Career Goal',
    desc: 'Identify your target direction — from distributed systems at scale to competitive GATE prep or venture fundraising.'
  },
  {
    step: '02',
    icon: Compass,
    title: 'Discover an Alumnus',
    desc: 'Match transparently with verified IIIT Delhi seniors who conquered the same coursework and recruitment challenges.'
  },
  {
    step: '03',
    icon: Send,
    title: 'Request Mentorship',
    desc: 'Send a respectful, personalized guidance proposal outlining specific blockers and requested advice.'
  },
  {
    step: '04',
    icon: Sparkles,
    title: 'Receive Guidance',
    desc: 'Get actionable code feedback, system design mock interviews, or graduate school SOP critique.'
  },
  {
    step: '05',
    icon: Trophy,
    title: 'Unlock Opportunities',
    desc: 'Apply for direct alumni-sponsored internships, full-time referrals, and collaborative research roles.'
  }
];

export default function CareerJourney() {
  return (
    <section className="journey-timeline-section" id="career-journey">
      <div className="content-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
          <div className="hero-eyebrow-container" style={{ margin: '0 auto 16px auto' }}>
            <Sparkles size={14} />
            <span>Demonstration Journey</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            Small Connections. Meaningful Progress.
          </h2>
          <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1.05rem' }}>
            A structured path illustrating how targeted student-alumni interactions translate into concrete career momentum.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="timeline-track-container">
          {JOURNEY_STEPS.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div key={idx} className="timeline-step-node">
                <div className="timeline-circle">
                  <IconComponent size={20} />
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-lime)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  Step {s.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700, marginBottom: '6px' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary-dark)', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px', fontSize: '0.8rem', color: '#64748B' }}>
          * Illustrative user journey roadmap representing typical mentorship outcomes across our institutional network.
        </div>
      </div>
    </section>
  );
}
