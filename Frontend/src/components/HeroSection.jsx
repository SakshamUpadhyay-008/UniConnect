import React, { useState, useRef } from 'react';
import { ArrowRight, Compass, Sparkles, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { ALUMNI_DATA } from '../data/alumniData';

export default function HeroSection({ onFindMentor, onExploreAlumni, onSelectAlumnus, onRequestMentorship }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Top match alumnus is Priya Sharma
  const topMatch = ALUMNI_DATA[0];
  const floatAlum1 = ALUMNI_DATA[1]; // Arpit Bansal
  const floatAlum2 = ALUMNI_DATA[2]; // Ananya Sen
  const floatAlum3 = ALUMNI_DATA[3]; // Varun Verma

  const handleMouseMove = (e) => {
    // Only calculate tilt on desktop
    if (window.innerWidth <= 768 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 4 to 6 degree tilt maximum
    const rotateY = ((x - centerX) / centerX) * 5.5;
    const rotateX = -((y - centerY) / centerY) * 5.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="content-container">
        <div className="hero-two-column-grid">
          {/* Left Column: Headlines & Actions */}
          <div>
            <div className="hero-eyebrow-container">
              <Sparkles size={14} />
              <span>IIIT Delhi Alumni Network</span>
            </div>

            <h1 className="hero-main-headline">
              Your next opportunity might be{' '}
              <span className="hero-headline-highlight">one conversation away.</span>
            </h1>

            <p className="hero-supporting-text">
              Connect with alumni who understand your goals, share your interests, and can help you take your next step.
            </p>

            <div className="hero-cta-group">
              <button className="btn-hero-primary" onClick={onFindMentor}>
                <span>Find My Mentor</span>
                <ArrowRight size={17} />
              </button>

              <button className="btn-hero-secondary" onClick={onExploreAlumni}>
                <Compass size={17} />
                <span>Explore Alumni</span>
              </button>
            </div>

            <div className="hero-trust-indicator">
              <ShieldCheck size={18} color="var(--accent-lime)" />
              <span>Built for students. Powered by community. • Verified Institutional Affiliation</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Alumni Matching Canvas */}
          <div 
            className="hero-3d-visualizer-container"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="hero-tilt-wrapper"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              }}
            >
              {/* Secondary Floating Card 1: Top Right */}
              <div 
                className="secondary-float-card float-card-1"
                onClick={() => onSelectAlumnus(floatAlum1)}
                title="View Arpit Bansal profile"
                style={{
                  transform: `translateZ(${25 + tilt.y * 2}px) rotate(5deg)`
                }}
              >
                <img src={floatAlum1.avatar} alt={floatAlum1.name} className="float-avatar-mini" />
                <div>
                  <div className="float-name">{floatAlum1.name}</div>
                  <div className="float-role">{floatAlum1.company}</div>
                  <span className="float-tag">Distributed Systems</span>
                </div>
              </div>

              {/* Main White Matching Card */}
              <div className="main-match-card-white">
                <div className="match-card-header">
                  <span className="badge-top-match">
                    <Star size={13} fill="#102345" color="#102345" />
                    Your Top Match
                  </span>
                  <span className="badge-match-score">
                    {topMatch.matchScore}% Match
                  </span>
                </div>

                <div className="match-alumni-meta">
                  <img src={topMatch.avatar} alt={topMatch.name} className="match-avatar-img" />
                  <div>
                    <h3 className="match-alumni-name">{topMatch.name}</h3>
                    <div className="match-alumni-role">{topMatch.role}</div>
                    <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                      {topMatch.company} • {topMatch.degree}
                    </div>
                  </div>
                </div>

                <div className="match-skills-strip">
                  {topMatch.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="match-skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="match-explanation-box">
                  "{topMatch.matchReason}"
                </div>

                <div className="match-actions-row">
                  <button 
                    className="btn-card-secondary"
                    onClick={() => onSelectAlumnus(topMatch)}
                  >
                    View Profile
                  </button>
                  <button 
                    className="btn-card-primary"
                    onClick={() => onRequestMentorship(topMatch)}
                  >
                    Request Introduction
                  </button>
                </div>
              </div>

              {/* Secondary Floating Card 2: Bottom Left */}
              <div 
                className="secondary-float-card float-card-2"
                onClick={() => onSelectAlumnus(floatAlum2)}
                title="View Ananya Sen profile"
                style={{
                  transform: `translateZ(${30 - tilt.y * 2}px) rotate(-6deg)`
                }}
              >
                <img src={floatAlum2.avatar} alt={floatAlum2.name} className="float-avatar-mini" />
                <div>
                  <div className="float-name">{floatAlum2.name}</div>
                  <div className="float-role">{floatAlum2.company}</div>
                  <span className="float-tag">Product Strategy</span>
                </div>
              </div>

              {/* Secondary Floating Card 3: Bottom Right */}
              <div 
                className="secondary-float-card float-card-3"
                onClick={() => onSelectAlumnus(floatAlum3)}
                title="View Varun Verma profile"
                style={{
                  transform: `translateZ(${20 + tilt.x * 2}px) rotate(4deg)`
                }}
              >
                <img src={floatAlum3.avatar} alt={floatAlum3.name} className="float-avatar-mini" />
                <div>
                  <div className="float-name">{floatAlum3.name}</div>
                  <div className="float-role">{floatAlum3.company}</div>
                  <span className="float-tag">AIR 4 / Stanford</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
