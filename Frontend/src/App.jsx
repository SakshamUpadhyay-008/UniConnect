import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureStrip from './components/FeatureStrip';
import HowItWorks from './components/HowItWorks';
import AlumniExplorer from './components/AlumniExplorer';
import NetworkVisualization from './components/NetworkVisualization';
import OpportunitiesSection from './components/OpportunitiesSection';
import IntroductionAssistant from './components/IntroductionAssistant';
import CareerJourney from './components/CareerJourney';
import Footer from './components/Footer';
import CareerGoalFinder from './components/CareerGoalFinder';
import AlumniProfileModal from './components/AlumniProfileModal';
import MentorshipRequestModal from './components/MentorshipRequestModal';
import AuthModal from './components/AuthModal';
import { ALUMNI_DATA } from './data/alumniData';

export default function App() {
  // Modal states
  const [isGoalFinderOpen, setIsGoalFinderOpen] = useState(false);
  const [selectedAlumnusForProfile, setSelectedAlumnusForProfile] = useState(null);
  const [selectedAlumnusForRequest, setSelectedAlumnusForRequest] = useState(null);
  const [initialRequestNote, setInitialRequestNote] = useState('');
  const [authModalConfig, setAuthModalConfig] = useState(null); // 'login' | 'register' | null

  // Active mentorship requests tracker (local demo persistence)
  const [sentRequests, setSentRequests] = useState([
    {
      id: 'req_init_1',
      studentName: 'Aarav Patel',
      alumniName: 'Priya Sharma',
      alumniCompany: 'Google DeepMind',
      subject: 'AI Research Career Paths & Paper Writing',
      status: 'pending',
      timestamp: '2 hours ago'
    }
  ]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Navigation smooth scroll
  const handleNavigate = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open mentorship request modal
  const handleOpenRequest = (alumnus, customNote = '') => {
    setSelectedAlumnusForRequest(alumnus);
    setInitialRequestNote(customNote);
  };

  // Handle submitted request
  const handleSubmitRequest = (newRequest) => {
    setSentRequests([newRequest, ...sentRequests]);
    showToast(`Mentorship request successfully sent to ${newRequest.alumniName}!`);
  };

  return (
    <div className="app-wrapper">
      {/* Background Ambient Glows */}
      <div className="ambient-top-light" />
      <div className="ambient-mid-light" />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'rgba(5, 11, 22, 0.95)',
          border: '1px solid var(--accent-lime)',
          borderRadius: '14px',
          padding: '14px 20px',
          color: '#ffffff',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8), var(--glow-lime)',
          zIndex: 1000,
          fontSize: '0.9rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ color: 'var(--accent-lime)' }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar 
        onNavigate={handleNavigate}
        onOpenSearch={() => handleNavigate('alumni-explorer')}
        onOpenAuth={(mode) => setAuthModalConfig(mode)}
        onOpenGoalFinder={() => setIsGoalFinderOpen(true)}
      />

      <main>
        {/* 3D Cinematic Hero Section */}
        <HeroSection 
          onFindMentor={() => setIsGoalFinderOpen(true)}
          onExploreAlumni={() => handleNavigate('alumni-explorer')}
          onSelectAlumnus={(alumnus) => setSelectedAlumnusForProfile(alumnus)}
          onRequestMentorship={(alumnus) => handleOpenRequest(alumnus)}
        />

        {/* Feature Strip (4 Pillars) */}
        <FeatureStrip />

        {/* How It Works (Preserved White 3-Step Section) */}
        <HowItWorks 
          onGetStarted={() => setIsGoalFinderOpen(true)}
        />

        {/* Alumni Explorer (Dedicated Search & Multi-filter Directory) */}
        <AlumniExplorer 
          onSelectAlumnus={(alumnus) => setSelectedAlumnusForProfile(alumnus)}
          onRequestMentorship={(alumnus) => handleOpenRequest(alumnus)}
        />

        {/* Network Visualization (Interactive SVG Topology) */}
        <NetworkVisualization />

        {/* Opportunities (Internships, Research, Full-time with Alumni Referrals) */}
        <OpportunitiesSection />

        {/* Smart Introduction Assistant (Editable Message Generator) */}
        <IntroductionAssistant 
          onSendGeneratedMessage={(alumnus, msg) => handleOpenRequest(alumnus, msg)}
        />

        {/* Career Journey Timeline (Progressive Roadmap) */}
        <CareerJourney />
      </main>

      {/* Refined Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenAuth={(mode) => setAuthModalConfig(mode)}
      />

      {/* Interactive Career Goal Finder Modal */}
      <CareerGoalFinder 
        isOpen={isGoalFinderOpen}
        onClose={() => setIsGoalFinderOpen(false)}
        onSelectAlumnus={(alumnus) => setSelectedAlumnusForProfile(alumnus)}
        onRequestMentorship={(alumnus) => handleOpenRequest(alumnus)}
      />

      {/* High-End Alumni Profile Modal */}
      <AlumniProfileModal 
        alumnus={selectedAlumnusForProfile}
        onClose={() => setSelectedAlumnusForProfile(null)}
        onRequestMentorship={(alumnus) => handleOpenRequest(alumnus)}
      />

      {/* Mentorship Request Flow Modal */}
      <MentorshipRequestModal 
        alumnus={selectedAlumnusForRequest}
        initialNote={initialRequestNote}
        onClose={() => setSelectedAlumnusForRequest(null)}
        onSubmitRequest={handleSubmitRequest}
      />

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={Boolean(authModalConfig)}
        initialMode={authModalConfig || 'login'}
        onClose={() => setAuthModalConfig(null)}
        onLoginSuccess={(user) => {
          showToast(`Welcome back, ${user.fullName} (${user.role})!`);
        }}
      />
    </div>
  );
}
