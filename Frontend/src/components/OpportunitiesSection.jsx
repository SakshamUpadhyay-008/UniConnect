import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { OPPORTUNITIES_DATA } from '../data/alumniData';

const TABS = ['All', 'Internships', 'Full-time', 'Research', 'Entrepreneurship'];

export default function OpportunitiesSection() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' 
    ? OPPORTUNITIES_DATA 
    : OPPORTUNITIES_DATA.filter(o => o.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="opportunities-section" id="opportunities">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="hero-eyebrow-container">
              <Briefcase size={14} />
              <span>Campus Career Pipeline</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Opportunities That Match Your Ambition
            </h2>
            <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1.05rem', maxWidth: '640px' }}>
              Direct internship referrals, full-time openings, and research fellowships championed by verified IIIT Delhi alumni.
            </p>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            Demonstration Postings • IIITD Network
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              className={`filter-select ${activeTab === tab ? 'active' : ''}`}
              style={{
                background: activeTab === tab ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab ? '#102345' : '#cbd5e1',
                fontWeight: activeTab === tab ? 800 : 500,
                border: activeTab === tab ? '1px solid var(--accent-lime)' : '1px solid var(--border-subtle)'
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="opportunities-grid">
          {filtered.map((opp) => (
            <div key={opp.id} className="opportunity-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ 
                    background: 'rgba(216, 255, 98, 0.12)', 
                    color: 'var(--accent-lime)', 
                    fontSize: '0.74rem', 
                    fontWeight: 700, 
                    padding: '3px 10px', 
                    borderRadius: '9999px',
                    border: '1px solid rgba(216, 255, 98, 0.3)'
                  }}>
                    {opp.type}
                  </span>

                  <span style={{ fontSize: '0.82rem', color: '#32C56A', fontWeight: 700 }}>
                    {opp.stipend}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginBottom: '6px' }}>
                  {opp.title}
                </h3>

                <div style={{ fontSize: '0.92rem', color: 'var(--accent-lime)', fontWeight: 600, marginBottom: '12px' }}>
                  {opp.organization}
                </div>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '16px' }}>
                  {opp.description}
                </p>

                {/* Eligibility & Sponsor */}
                <div style={{ background: 'rgba(5, 11, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '18px' }}>
                  <div style={{ marginBottom: '4px' }}>
                    <strong style={{ color: '#ffffff' }}>Eligibility:</strong> {opp.eligibility}
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>Alumni Sponsor:</strong> {opp.alumniSponsor}
                  </div>
                </div>

                {/* Skills chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {opp.skills.map((s, idx) => (
                    <span key={idx} style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1', padding: '3px 8px', borderRadius: '4px' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <Calendar size={14} />
                  <span>Deadline: {opp.deadline}</span>
                </div>

                <button 
                  type="button" 
                  className="btn-hero-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={() => alert(`Applying for: ${opp.title}\n\nThis application is routed through ${opp.alumniSponsor} via IIIT Delhi Career Services.`)}
                >
                  <span>Apply with Referral</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
