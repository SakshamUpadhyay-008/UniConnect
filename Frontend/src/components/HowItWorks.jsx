import React from 'react';
import { Target, Users, MessageSquareCode, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    icon: Target,
    title: 'Share Your Goal',
    description: 'Specify your career ambitions, technical interests, target companies, and specific mentorship requirements — whether preparing for FAANG interviews, planning higher studies, or building your first startup.'
  },
  {
    num: '2',
    icon: Users,
    title: 'Find Your People',
    description: 'Our transparent matching system discovers verified IIIT Delhi alumni who walked your exact academic path, completed the same coursework, and excelled in your target domains.'
  },
  {
    num: '3',
    icon: MessageSquareCode,
    title: 'Start a Conversation',
    description: 'Send structured, personalized mentorship proposals and receive actionable guidance through 1:1 discussions, code reviews, and career roadmaps without cold message friction.'
  }
];

export default function HowItWorks({ onGetStarted }) {
  return (
    <section className="how-it-works-white-section" id="how-it-works">
      <div className="content-container">
        {/* Section Header */}
        <div className="hiw-header-center">
          <span className="hiw-label-pill">HOW IT WORKS</span>
          <h2 className="hiw-headline">
            From Goals to Opportunities
          </h2>
          <p className="hiw-supporting">
            A simple journey to help you find the right people, at the right time.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="hiw-three-steps-grid">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="hiw-step-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="hiw-step-num">{step.num}</div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#102345'
                  }}>
                    <IconComponent size={22} />
                  </div>
                </div>

                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            type="button" 
            className="btn-hero-primary" 
            style={{ background: '#102345', color: '#ffffff' }}
            onClick={onGetStarted}
          >
            <span>Begin Your Mentor Discovery</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
