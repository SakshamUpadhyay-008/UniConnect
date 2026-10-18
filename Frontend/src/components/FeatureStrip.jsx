import React from 'react';
import { ShieldCheck, Cpu, MessageSquare, Briefcase } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Alumni',
    desc: 'Every alumnus profile is verified against official IIIT Delhi academic and degree records, protecting community trust.'
  },
  {
    icon: Cpu,
    title: 'Personalized Matching',
    desc: 'Transparent explainable ranking based on shared skills, company ambitions, and specific career trajectories.'
  },
  {
    icon: MessageSquare,
    title: 'Mentorship & Guidance',
    desc: 'Voluntary, mutual consent engagement. Direct messaging unlocks only after both parties agree.'
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    desc: 'Direct alumni-sponsored internships, referrals at top tech firms, and research fellowships.'
  }
];

export default function FeatureStrip() {
  return (
    <section className="feature-strip-section" aria-label="Core Platform Pillars">
      <div className="content-container">
        <div className="feature-strip-grid">
          {FEATURES.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div key={idx} className="feature-strip-card">
                <div className="feature-icon-wrap">
                  <IconComponent size={22} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
