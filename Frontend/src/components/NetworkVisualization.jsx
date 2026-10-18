import React, { useState } from 'react';
import { Share2, Info, Sparkles, Building2, User, BookOpen } from 'lucide-react';
import { NETWORK_NODES, NETWORK_LINKS } from '../data/alumniData';

export default function NetworkVisualization() {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const activeNode = NETWORK_NODES.find(n => n.id === hoveredNodeId);

  // Group colors
  const getColor = (group) => {
    switch (group) {
      case 'college': return '#D8FF62'; // neon lime
      case 'alumni': return '#38BDF8'; // cyan
      case 'company': return '#F59E0B'; // amber
      case 'interest': return '#A78BFA'; // purple
      case 'student': return '#32C56A'; // emerald
      default: return '#CBD5E1';
    }
  };

  return (
    <section className="network-viz-section" id="network-viz">
      <div className="content-container">
        <div className="network-viz-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="hero-eyebrow-container">
                <Share2 size={14} />
                <span>Interactive Topology</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Your Network, Intelligently Connected
              </h2>
              <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1rem', maxWidth: '640px' }}>
                Hover over nodes to explore real relationship pathways linking IIIT Delhi students, alumni, global technology employers, and research domains.
              </p>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', background: 'rgba(5, 11, 22, 0.6)', padding: '10px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#cbd5e1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D8FF62' }}></span>
                <span>Institution</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#cbd5e1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8' }}></span>
                <span>Alumni</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#cbd5e1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></span>
                <span>Companies</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#cbd5e1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A78BFA' }}></span>
                <span>Interests</span>
              </div>
            </div>
          </div>

          {/* SVG Interactive Canvas */}
          <div className="network-svg-container">
            <svg 
              viewBox="0 0 500 340" 
              style={{ width: '100%', height: '100%' }}
              role="img" 
              aria-label="Interactive Alumni Network Map"
            >
              <defs>
                <filter id="glow-lime-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connected Lines */}
              {NETWORK_LINKS.map((link, idx) => {
                const sourceNode = NETWORK_NODES.find(n => n.id === link.source);
                const targetNode = NETWORK_NODES.find(n => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToHover = 
                  hoveredNodeId && (link.source === hoveredNodeId || link.target === hoveredNodeId);
                const isDimmed = hoveredNodeId && !isConnectedToHover;

                return (
                  <line
                    key={idx}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isConnectedToHover ? '#D8FF62' : 'rgba(255, 255, 255, 0.18)'}
                    strokeWidth={isConnectedToHover ? 2.5 : 1.2}
                    strokeDasharray={isConnectedToHover ? 'none' : '4,4'}
                    opacity={isDimmed ? 0.15 : 0.8}
                    style={{ transition: '0.2s ease' }}
                  />
                );
              })}

              {/* Render Nodes */}
              {NETWORK_NODES.map((node) => {
                const isHovered = node.id === hoveredNodeId;
                const isConnected = hoveredNodeId && NETWORK_LINKS.some(
                  l => (l.source === hoveredNodeId && l.target === node.id) || 
                       (l.target === hoveredNodeId && l.source === node.id)
                );
                const isDimmed = hoveredNodeId && !isHovered && !isConnected;

                const fillCol = getColor(node.group);

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: 'pointer', transition: '0.2s ease' }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.label} (${node.meta})`}
                  >
                    {/* Outer Glow Circle */}
                    <circle 
                      r={isHovered ? node.size + 8 : node.size + 4} 
                      fill="none" 
                      stroke={fillCol} 
                      strokeWidth={isHovered ? 2 : 1}
                      opacity={isDimmed ? 0.1 : (isHovered ? 0.8 : 0.3)}
                      filter={isHovered ? 'url(#glow-lime-filter)' : undefined}
                    />

                    {/* Core Node Circle */}
                    <circle 
                      r={node.size} 
                      fill="#0B1730"
                      stroke={fillCol}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      opacity={isDimmed ? 0.2 : 1}
                    />

                    {/* Node Label Text */}
                    <text
                      textAnchor="middle"
                      dy={node.size + 16}
                      fill={isHovered ? '#ffffff' : '#A9B5C8'}
                      fontSize={node.size > 20 ? '11px' : '9.5px'}
                      fontWeight={isHovered ? 700 : 500}
                      opacity={isDimmed ? 0.25 : 1}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hovered Node Info Floating Card */}
            {activeNode && (
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(5, 11, 22, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--accent-lime)',
                borderRadius: '14px',
                padding: '12px 18px',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), var(--glow-lime)',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: getColor(activeNode.group)
                }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    {activeNode.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    {activeNode.meta}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
