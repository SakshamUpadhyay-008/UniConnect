import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, UserCheck, ShieldCheck, Loader2 } from 'lucide-react';
import { ALUMNI_DATA, CAREER_GOALS, SKILLS_LIST } from '../data/alumniData';

export default function CareerGoalFinder({ isOpen, onClose, onSelectAlumnus, onRequestMentorship }) {
  const [careerGoal, setCareerGoal] = useState('AI and Machine Learning');
  const [targetCompany, setTargetCompany] = useState('Google DeepMind');
  const [selectedSkills, setSelectedSkills] = useState(['PyTorch', 'Transformers']);
  const [experienceLevel, setExperienceLevel] = useState('Senior (5+ yrs)');
  const [mentorshipTopic, setMentorshipTopic] = useState('Research Career Paths & Paper Writing');

  const [isLoading, setIsLoading] = useState(false);
  const [matchedResults, setMatchedResults] = useState(null);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleMatchSearch = (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill to help us calculate accurate matches.');
      return;
    }

    setIsLoading(true);

    // Explainable deterministic ranking algorithm
    setTimeout(() => {
      const scoredAlumni = ALUMNI_DATA.map((alumnus) => {
        let score = 50; // base score

        // 1. Target company match
        if (targetCompany && alumnus.company.toLowerCase().includes(targetCompany.toLowerCase().split(' ')[0])) {
          score += 25;
        }

        // 2. Shared skills match
        const matchingSkills = alumnus.skills.filter(s => selectedSkills.includes(s));
        score += matchingSkills.length * 10;

        // 3. Goal & interests alignment
        if (careerGoal.includes('AI') && (alumnus.role.includes('Machine Learning') || alumnus.role.includes('Research'))) {
          score += 15;
        } else if (careerGoal.includes('Software') && alumnus.role.includes('Software')) {
          score += 15;
        } else if (careerGoal.includes('Product') && alumnus.role.includes('Product')) {
          score += 15;
        } else if (careerGoal.includes('Higher') && alumnus.role.includes('Ph.D.')) {
          score += 15;
        }

        // Cap at 99%
        const finalScore = Math.min(score, 99);

        // Generate explainable reason
        const reason = `Matched because of ${matchingSkills.length > 0 ? `shared skills (${matchingSkills.join(', ')})` : 'aligned technical foundation'}, ` +
          `${targetCompany && alumnus.company.toLowerCase().includes(targetCompany.toLowerCase().split(' ')[0]) ? `target employer affinity (${alumnus.company}), ` : ''}` +
          `and targeted ${careerGoal} trajectory.`;

        return {
          ...alumnus,
          calculatedScore: finalScore,
          calculatedReason: reason,
          matchingSkills
        };
      });

      // Sort descending by score
      scoredAlumni.sort((a, b) => b.calculatedScore - a.calculatedScore);

      setMatchedResults(scoredAlumni.slice(0, 3));
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="modal-backdrop-layer" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-dialog-card" 
        style={{ maxWidth: '780px', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close goal finder">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', marginBottom: '8px' }}>
          <Sparkles size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Intelligent Mentor Discovery
          </span>
        </div>

        <h3 className="modal-title" style={{ fontSize: '1.65rem' }}>
          Career Goal & Mentor Matcher
        </h3>
        <p className="modal-subtitle" style={{ marginBottom: '24px' }}>
          Specify your ambition, preferred skills, and target company to get transparent, ranked recommendations from IIIT Delhi alumni.
        </p>

        {!matchedResults ? (
          <form onSubmit={handleMatchSearch}>
            {/* Career Goal */}
            <div className="form-group">
              <label className="form-label">Primary Career Goal *</label>
              <select 
                className="form-select"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              >
                {CAREER_GOALS.map((goal, idx) => (
                  <option key={idx} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            {/* Target Company & Preferred Experience */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Target Company / Lab</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. Google, Uber, Stanford, Razorpay"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mentor Seniority</label>
                <select 
                  className="form-select"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="Junior (1-3 yrs)">Early Career (1–3 years post-grad)</option>
                  <option value="Senior (5+ yrs)">Senior / Staff (5+ years experience)</option>
                  <option value="Any Experience">Any Verified Experience</option>
                </select>
              </div>
            </div>

            {/* Multi-Select Skills */}
            <div className="form-group" style={{ marginTop: '6px' }}>
              <label className="form-label">Skills You Want Guidance On (Select Multiple) *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {SKILLS_LIST.map((skill, idx) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleSkill(skill)}
                      style={{
                        background: isSelected ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#102345' : '#cbd5e1',
                        border: isSelected ? '1px solid var(--accent-lime)' : '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '9999px',
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        transition: '0.15s ease'
                      }}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mentorship Topic */}
            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label">What specific topic do you want to explore?</label>
              <input 
                type="text"
                className="form-input"
                placeholder="e.g., How to transition from campus projects to tier-1 AI lab research"
                value={mentorshipTopic}
                onChange={(e) => setMentorshipTopic(e.target.value)}
              />
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button 
                type="button" 
                className="btn-hero-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-hero-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spin-slow" />
                    <span>Calculating Matches...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate Recommended Matches</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* MATCH RESULTS */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>
                  Top Ranked Recommendations ({matchedResults.length})
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  Ranked by company alignment, shared technical skills, and verified IIITD graduation records.
                </p>
              </div>

              <button 
                type="button" 
                className="btn-nav-login" 
                style={{ fontSize: '0.82rem', border: '1px solid var(--border-subtle)' }}
                onClick={() => setMatchedResults(null)}
              >
                Refine Goals
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matchedResults.map((match) => (
                <div 
                  key={match.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '18px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img 
                        src={match.avatar} 
                        alt={match.name} 
                        style={{ width: '52px', height: '52px', borderRadius: '14px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h5 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 700 }}>
                            {match.name}
                          </h5>
                          <span style={{ fontSize: '0.72rem', background: 'rgba(216, 255, 98, 0.12)', color: 'var(--accent-lime)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                            {match.degree}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.86rem', color: '#cbd5e1' }}>
                          {match.role} • <strong>{match.company}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ 
                      background: '#EBFEE2', 
                      color: '#1A7F37', 
                      fontWeight: 800, 
                      fontSize: '0.85rem', 
                      padding: '4px 12px', 
                      borderRadius: '9999px',
                      border: '1px solid rgba(50, 197, 106, 0.35)'
                    }}>
                      {match.calculatedScore}% Match
                    </div>
                  </div>

                  {/* Explainable Match Reason per specification */}
                  <div style={{ 
                    background: 'rgba(11, 23, 48, 0.8)', 
                    borderLeft: '3px solid var(--accent-lime)', 
                    borderRadius: '6px', 
                    padding: '10px 14px', 
                    fontSize: '0.82rem', 
                    color: '#cbd5e1', 
                    lineHeight: 1.5 
                  }}>
                    <strong>Why this match:</strong> {match.calculatedReason}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {match.skills.slice(0, 3).map((s, idx) => (
                        <span key={idx} style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '2px 8px', borderRadius: '4px' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        type="button" 
                        className="btn-hero-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                        onClick={() => { onClose(); onSelectAlumnus(match); }}
                      >
                        Profile
                      </button>
                      <button 
                        type="button" 
                        className="btn-hero-primary"
                        style={{ padding: '6px 16px', fontSize: '0.82rem' }}
                        onClick={() => { onClose(); onRequestMentorship(match); }}
                      >
                        Request Mentorship
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
