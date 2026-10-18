import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onNavigate, onOpenSearch, onOpenAuth, onOpenGoalFinder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (tabId, targetId) => {
    setActiveTab(tabId);
    setMobileDrawerOpen(false);
    onNavigate(targetId);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="content-container">
        <div className="navbar-inner">
          {/* Logo & College Badge */}
          <div 
            className="navbar-brand" 
            onClick={() => handleLinkClick('home', 'hero')}
            role="button"
            tabIndex={0}
          >
            <div className="brand-emblem">
              <span>UC</span>
            </div>
            <span className="brand-name">UniConnect</span>
            <span className="brand-college-tag">Alumni Network</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="navbar-nav-links">
              <li>
                <button 
                  className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('home', 'hero')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeTab === 'alumni' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('alumni', 'alumni-explorer')}
                >
                  Alumni
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeTab === 'students' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('students', 'how-it-works')}
                >
                  For Students
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('opportunities', 'opportunities')}
                >
                  Opportunities
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeTab === 'network' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('network', 'network-viz')}
                >
                  Network
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="navbar-right-actions">
            <button 
              className="nav-icon-search-btn" 
              onClick={onOpenSearch} 
              aria-label="Search Alumni Directory"
              title="Search Alumni"
            >
              <Search size={17} />
            </button>

            <button 
              className="btn-nav-login" 
              onClick={() => onOpenAuth('login')}
            >
              Log In
            </button>

            <button 
              className="btn-nav-cta" 
              onClick={onOpenGoalFinder}
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </button>

            <button 
              className="mobile-drawer-toggle" 
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Toggle Navigation Drawer"
            >
              {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div style={{
          position: 'absolute',
          top: '76px',
          left: '16px',
          right: '16px',
          background: 'rgba(11, 23, 48, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          zIndex: 100
        }}>
          <button className="nav-link-btn" style={{ textAlign: 'left', fontSize: '1.05rem' }} onClick={() => handleLinkClick('home', 'hero')}>
            Home
          </button>
          <button className="nav-link-btn" style={{ textAlign: 'left', fontSize: '1.05rem' }} onClick={() => handleLinkClick('alumni', 'alumni-explorer')}>
            Alumni Directory
          </button>
          <button className="nav-link-btn" style={{ textAlign: 'left', fontSize: '1.05rem' }} onClick={() => handleLinkClick('students', 'how-it-works')}>
            For Students (How It Works)
          </button>
          <button className="nav-link-btn" style={{ textAlign: 'left', fontSize: '1.05rem' }} onClick={() => handleLinkClick('opportunities', 'opportunities')}>
            Opportunities
          </button>
          <button className="nav-link-btn" style={{ textAlign: 'left', fontSize: '1.05rem' }} onClick={() => handleLinkClick('network', 'network-viz')}>
            Network Graph
          </button>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }}></div>
          <button className="btn-hero-primary" style={{ justifyContent: 'center' }} onClick={() => { onOpenGoalFinder(); setMobileDrawerOpen(false); }}>
            Find My Mentor
          </button>
          <button className="btn-hero-secondary" style={{ justifyContent: 'center' }} onClick={() => { onOpenAuth('login'); setMobileDrawerOpen(false); }}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
