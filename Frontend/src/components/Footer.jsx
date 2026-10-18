import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAuth }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="content-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div className="brand-emblem" style={{ width: '32px', height: '32px', fontSize: '1rem' }}>
                AB
              </div>
              <span className="brand-name" style={{ fontSize: '1.3rem' }}>AlumBridge</span>
              <span className="brand-college-tag">IIIT Delhi</span>
            </div>

            <p style={{ color: 'var(--text-secondary-dark)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '380px', marginBottom: '20px' }}>
              The premium alumni networking and intelligent career-mentorship platform for Indraprastha Institute of Information Technology Delhi.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Institutional Affiliation & Data Isolation Verified</span>
            </div>
          </div>

          {/* Student Links */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#ffffff', marginBottom: '18px' }}>
              For Students
            </h4>
            <ul className="footer-links-col">
              <li>
                <button onClick={() => onNavigate('alumni-explorer')}>Explore Alumni Directory</button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunities')}>Campus Referrals & Internships</button>
              </li>
              <li>
                <button onClick={() => onNavigate('message-assistant')}>Smart Introduction Assistant</button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-journey')}>Career Journey Roadmap</button>
              </li>
            </ul>
          </div>

          {/* Alumni Links */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#ffffff', marginBottom: '18px' }}>
              For Alumni
            </h4>
            <ul className="footer-links-col">
              <li>
                <button onClick={() => onOpenAuth('login')}>Alumni Sign In</button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')}>Mentorship Best Practices</button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunities')}>Post an Opportunity</button>
              </li>
              <li>
                <button onClick={() => onNavigate('network-viz')}>Explore IIITD Network Graph</button>
              </li>
            </ul>
          </div>

          {/* Institution Links */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#ffffff', marginBottom: '18px' }}>
              Institution & Privacy
            </h4>
            <ul className="footer-links-col">
              <li>
                <a href="https://iiitd.ac.in" target="_blank" rel="noopener noreferrer">
                  IIIT Delhi Official Site <ArrowUpRight size={13} style={{ display: 'inline' }} />
                </a>
              </li>
              <li>
                <button onClick={() => alert("IIIT Delhi Alumni Office:\n\nAlumBridge is developed in collaboration with IIIT Delhi Alumni Relations & Student Affairs.\nContact: alumni-office@iiitd.ac.in")}>
                  Institutional Contact
                </button>
              </li>
              <li>
                <button onClick={() => alert("Data Privacy & Security:\n\nStudent and alumni records are verified against official IIIT Delhi academic registries. No personal contact information is exposed publicly.")}>
                  Data Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} AlumBridge (UniConnect) • IIIT Delhi Alumni Network. All rights reserved.
          </div>
          <div>
            "Your next opportunity might be one conversation away."
          </div>
        </div>
      </div>
    </footer>
  );
}
