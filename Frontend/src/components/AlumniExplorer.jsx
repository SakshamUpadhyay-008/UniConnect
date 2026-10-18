import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, ShieldCheck, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ALUMNI_DATA, SKILLS_LIST } from '../data/alumniData';

export default function AlumniExplorer({ onSelectAlumnus, onRequestMentorship }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Filter & sort logic
  const filteredAlumni = useMemo(() => {
    return ALUMNI_DATA.filter((alumnus) => {
      // 1. Text search across name, company, role
      const matchesSearch = 
        alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnus.role.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Skill filter
      if (selectedSkill !== 'all' && !alumnus.skills.includes(selectedSkill)) {
        return false;
      }

      // 3. Graduation year filter
      if (selectedYear !== 'all' && alumnus.graduationYear.toString() !== selectedYear) {
        return false;
      }

      // 4. Availability filter
      if (availableOnly && !alumnus.mentorshipAvailable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'experience') {
        return b.experienceYears - a.experienceYears;
      }
      return b.matchScore - a.matchScore; // default relevance
    });
  }, [searchTerm, selectedSkill, selectedYear, availableOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSkill('all');
    setSelectedYear('all');
    setAvailableOnly(false);
    setSortBy('relevance');
  };

  return (
    <section className="alumni-explorer-section" id="alumni-explorer">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="hero-eyebrow-container">
            <Filter size={14} />
            <span>Verified IIIT Delhi Directory</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Explore IIIT Delhi Alumni
          </h2>
          <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1.05rem', maxWidth: '640px' }}>
            Filter by company, graduation batch, technical skills, and current mentorship capacity. All profiles verified against institutional records.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="search-filters-bar">
          <div className="search-input-wrap">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="Search by alumnus name, company, or job role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search alumni"
            />
          </div>

          <div className="filters-row">
            {/* Skill Filter */}
            <select 
              className="filter-select"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              aria-label="Filter by skill"
            >
              <option value="all">All Skills</option>
              {SKILLS_LIST.map((skill, idx) => (
                <option key={idx} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Year Filter */}
            <select 
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter by graduation year"
            >
              <option value="all">All Batches</option>
              <option value="2021">Batch of 2021</option>
              <option value="2020">Batch of 2020</option>
              <option value="2019">Batch of 2019</option>
              <option value="2018">Batch of 2018</option>
              <option value="2017">Batch of 2017</option>
            </select>

            {/* Sort Filter */}
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort alumni"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="experience">Sort: Experience (High to Low)</option>
            </select>

            {/* Available Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <input 
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                style={{ accentColor: 'var(--accent-lime)' }}
              />
              <span>Available Mentors Only</span>
            </label>

            {/* Reset */}
            {(searchTerm || selectedSkill !== 'all' || selectedYear !== 'all' || availableOnly) && (
              <button 
                type="button" 
                onClick={handleResetFilters}
                className="btn-nav-login"
                style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Reset all filters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="alumni-cards-grid">
            {filteredAlumni.map((alumnus) => (
              <div key={alumnus.id} className="alumni-grid-card">
                <div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <img 
                      src={alumnus.avatar} 
                      alt={alumnus.name} 
                      style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
                        {alumnus.name}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary-dark)' }}>
                        {alumnus.role}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--accent-lime)', fontWeight: 600, marginTop: '2px' }}>
                        {alumnus.company}
                      </div>
                    </div>
                  </div>

                  {/* College Verification & Batch Badge */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      background: 'rgba(50, 197, 106, 0.12)', 
                      color: 'var(--color-success)', 
                      border: '1px solid rgba(50, 197, 106, 0.3)', 
                      fontSize: '0.72rem', 
                      fontWeight: 700, 
                      padding: '2px 8px', 
                      borderRadius: '9999px' 
                    }}>
                      <ShieldCheck size={12} />
                      IIITD Verified
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.04)', padding: '2px 8px', borderRadius: '4px' }}>
                      {alumnus.degree}
                    </span>
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {alumnus.bio}
                  </p>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {alumnus.skills.slice(0, 3).map((skill, sIdx) => (
                      <span key={sIdx} style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', padding: '3px 8px', borderRadius: '4px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: alumnus.mentorshipAvailable ? 'var(--color-success)' : 'var(--color-warning)' 
                    }} />
                    <span style={{ color: alumnus.mentorshipAvailable ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {alumnus.mentorshipAvailable ? 'Available' : 'Paused'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button" 
                      className="btn-card-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                      onClick={() => onSelectAlumnus(alumnus)}
                    >
                      Profile
                    </button>
                    <button 
                      type="button" 
                      className="btn-hero-primary"
                      disabled={!alumnus.mentorshipAvailable}
                      style={{ padding: '6px 14px', fontSize: '0.82rem', opacity: alumnus.mentorshipAvailable ? 1 : 0.4 }}
                      onClick={() => onRequestMentorship(alumnus)}
                    >
                      <Send size={12} />
                      <span>{alumnus.mentorshipAvailable ? 'Connect' : 'Paused'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
            <AlertCircle size={40} color="var(--accent-lime)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>
              No Alumni Match Your Current Filters
            </h3>
            <p style={{ color: 'var(--text-secondary-dark)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Try broadening your search term or clearing active skill and batch filters.
            </p>
            <button className="btn-hero-primary" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
