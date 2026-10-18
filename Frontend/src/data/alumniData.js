// UniConnect Alumni & Platform Demonstration Data
// All profiles represent verified collegiate alumni records across partner institutions

export const UNICONNECT_COMMUNITY = {
  name: 'UniConnect Collegiate Network',
  shortName: 'UniConnect',
  slug: 'uniconnect-network',
  officialDomain: '@uniconnect.edu',
  location: 'Global University Network'
};
export const IIITD_COLLEGE = UNICONNECT_COMMUNITY;

export const ALUMNI_DATA = [
  {
    id: 'alum_01',
    name: 'Priya Sharma',
    role: 'Staff Machine Learning Engineer',
    company: 'Google DeepMind',
    location: 'London, UK / Remote',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech CSE (Batch 2019)',
    graduationYear: 2019,
    department: 'Computer Science and Engineering',
    verifiedCollege: true,
    skills: ['PyTorch', 'Transformers', 'Reinforcement Learning', 'Distributed Training', 'Research Writing'],
    interests: ['Foundation Models', 'AI Alignment', 'High-Impact Research'],
    mentorshipAvailable: true,
    mentorshipTopics: ['AI Research Career Paths', 'Transitioning to Global Research Labs', 'Publishing at NeurIPS / ICLR'],
    matchScore: 98,
    matchReason: 'Matched because of shared skills: PyTorch & LLMs, target company: Google DeepMind, and career goal: AI Research.',
    bio: 'Researched NLP in top university labs and published on neural architectures. Currently working on reasoning models at Google DeepMind. Passionate about helping university students break into top tier AI research labs.',
    experienceYears: 6,
    pastExperience: ['Research Fellow @ IISc Bangalore', 'ML Intern @ Microsoft Research India']
  },
  {
    id: 'alum_02',
    name: 'Arpit Bansal',
    role: 'Senior Software Engineer (L5)',
    company: 'Uber Systems',
    location: 'Bangalore, India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech CSAM (Batch 2020)',
    graduationYear: 2020,
    department: 'Computer Science and Applied Mathematics',
    verifiedCollege: true,
    skills: ['Go', 'Distributed Systems', 'Kubernetes', 'Microservices', 'System Design'],
    interests: ['High-Throughput Geo-Services', 'Low-Latency Architecture', 'Interview Prep'],
    mentorshipAvailable: true,
    mentorshipTopics: ['High-Level System Design Practice', 'Off-Campus SDE Interview Roasts', 'Negotiating Tier-1 Offers'],
    matchScore: 94,
    matchReason: 'Matched for distributed backend systems, Go microservices, and senior engineer mentorship.',
    bio: 'Graduated CSAM in 2020. Built core dispatch routing at Uber handling 2M+ concurrent queries. Conducted 80+ system design interviews. Happy to guide juniors on low-level & high-level system design.',
    experienceYears: 5,
    pastExperience: ['Software Engineer @ Adobe Systems', 'Backend Intern @ Goldman Sachs']
  },
  {
    id: 'alum_03',
    name: 'Ananya Sen',
    role: 'Lead Product Manager',
    company: 'Razorpay',
    location: 'Bangalore, India',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech CSE (Batch 2018)',
    graduationYear: 2018,
    department: 'Computer Science and Engineering',
    verifiedCollege: true,
    skills: ['Product Strategy', 'Fintech APIs', 'Growth Metrics', 'User Research', 'Product Sense'],
    interests: ['B2B Payments', 'Developer Experience', 'APM Mentorship'],
    mentorshipAvailable: true,
    mentorshipTopics: ['Transitioning from Engineering to Product', 'APM Recruitment Frameworks', 'Product Case Study Teardowns'],
    matchScore: 91,
    matchReason: 'Matched for product management, fintech infrastructure, and APM interview frameworks.',
    bio: 'Switched from SWE to Product at Flipkart, now leading merchant checkout at Razorpay. Love helping engineering students unlock business intuition and product thinking.',
    experienceYears: 7,
    pastExperience: ['Product Manager @ Flipkart', 'Software Engineer @ Samsung R&D']
  },
  {
    id: 'alum_04',
    name: 'Varun Verma',
    role: 'AIR 4 (GATE CS) → Ph.D. Researcher',
    company: 'Stanford University / IISc',
    location: 'Palo Alto, CA / Bangalore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech ECE (Batch 2021)',
    graduationYear: 2021,
    department: 'Electronics and Communication Engineering',
    verifiedCollege: true,
    skills: ['Computer Architecture', 'C++', 'Compilers', 'GATE CSE Prep', 'Algorithms'],
    interests: ['Hardware-Software Co-Design', 'Quantum Computing', 'Higher Studies'],
    mentorshipAvailable: true,
    mentorshipTopics: ['Cracking GATE in Top 10 Ranks', 'Stanford / US MS-Ph.D. Applications', 'SOP and Research Proposals'],
    matchScore: 89,
    matchReason: 'Matched for GATE preparation, computer systems architecture, and US graduate school admissions.',
    bio: 'Prepared for GATE CS alongside undergraduate core coursework, securing AIR 4. Completed M.Tech at IISc, now pursuing Ph.D. at Stanford in energy-efficient compute.',
    experienceYears: 4,
    pastExperience: ['Hardware Research Fellow @ IISc Bangalore', 'Research Intern @ Intel Labs']
  },
  {
    id: 'alum_05',
    name: 'Kabir Batra',
    role: 'Co-Founder & CEO',
    company: 'CodeFlow (YC W23)',
    location: 'San Francisco, CA / Remote',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech CSE (Batch 2019)',
    graduationYear: 2019,
    department: 'Computer Science and Engineering',
    verifiedCollege: true,
    skills: ['Venture Capital', 'Product Market Fit', 'Developer Tools', 'B2B Sales', 'Next.js'],
    interests: ['AI Developer Tools', 'Seed Fundraising', 'Early Stage Hiring'],
    mentorshipAvailable: false, // Capacity paused example per spec
    pausedReason: 'Mentorship paused due to current YC accelerator batch sprint. Reopening in September.',
    mentorshipTopics: ['Student Startup Pitching', 'Applying to Y Combinator', 'Validating MVP with US customers'],
    matchScore: 86,
    matchReason: 'Matched for venture-backed entrepreneurship and student startup validation.',
    bio: 'Built developer tools from a campus dorm room. Raised $3M seed funding led by top US micro-VCs. Always excited to speak with student founders testing daring ideas.',
    experienceYears: 6,
    pastExperience: ['Full Stack Engineer @ Postman', 'Tech Lead @ Campus E-Cell']
  },
  {
    id: 'alum_06',
    name: 'Ishita Jain',
    role: 'Principal Security Engineer',
    company: 'Microsoft Cyber Defense',
    location: 'Redmond, WA / Remote',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    degree: 'B.Tech CSE (Batch 2017)',
    graduationYear: 2017,
    department: 'Computer Science and Engineering',
    verifiedCollege: true,
    skills: ['Cloud Security', 'Threat Modeling', 'Reverse Engineering', 'Zero Trust', 'Rust'],
    interests: ['Enterprise SecOps', 'Cryptographic Protocols', 'Defensive Engineering'],
    mentorshipAvailable: true,
    mentorshipTopics: ['Cybersecurity Career Guidance', 'CTF to Industry Security Engineering', 'FAANG Security Interview Prep'],
    matchScore: 88,
    matchReason: 'Matched for cloud security, systems programming in Rust, and defensive engineering.',
    bio: 'Former University Cybersecurity Club founder. Leads zero-trust architecture at Microsoft Azure. Mentors students looking to enter cybersecurity and privacy engineering.',
    experienceYears: 8,
    pastExperience: ['Senior Security Analyst @ CrowdStrike', 'Security Researcher @ CERT-In']
  }
];

export const CAREER_GOALS = [
  'Software Engineering',
  'Product Management',
  'AI and Machine Learning',
  'Research',
  'Entrepreneurship',
  'Higher Studies'
];

export const SKILLS_LIST = [
  'Python', 'PyTorch', 'System Design', 'Go', 'Distributed Systems',
  'Transformers', 'Kubernetes', 'Product Strategy', 'Microservices',
  'Algorithms', 'Computer Architecture', 'GATE CSE Prep', 'Cloud Security',
  'User Research', 'Venture Capital', 'Next.js', 'Rust'
];

export const OPPORTUNITIES_DATA = [
  {
    id: 'opp_01',
    title: 'Research Intern — Large Language Model Reasoning',
    organization: 'Google DeepMind Research Lab',
    type: 'Research',
    location: 'Bangalore / Hybrid',
    stipend: '₹85,000 / month',
    deadline: 'July 15, 2026',
    skills: ['PyTorch', 'Transformers', 'Math Foundations'],
    eligibility: 'Pre-final & final year university B.Tech/M.Tech with CGPA >= 8.0',
    description: 'Work alongside research scientists on evaluating step-by-step reasoning in code-generating LLMs.',
    alumniSponsor: 'Priya Sharma (Staff MLE)'
  },
  {
    id: 'opp_02',
    title: 'Software Development Engineering Intern (Backend)',
    organization: 'Uber Mobility Systems',
    type: 'Internships',
    location: 'Bangalore, India',
    stipend: '₹1,00,000 / month',
    deadline: 'August 1, 2026',
    skills: ['Go', 'Distributed Systems', 'Data Structures'],
    eligibility: '3rd year university students eligible for 6-month winter internship',
    description: 'Join the dispatch core team to build high-throughput geospatial distributed services.',
    alumniSponsor: 'Arpit Bansal (Senior SWE)'
  },
  {
    id: 'opp_03',
    title: 'Associate Product Manager (Full-Time)',
    organization: 'Razorpay Merchant Payments',
    type: 'Full-time',
    location: 'Bangalore, India',
    stipend: 'Competitive CTC + ESOPs',
    deadline: 'Rolling Applications',
    skills: ['Product Sense', 'Fintech APIs', 'Data Analysis'],
    eligibility: 'Graduating batch of 2026 university students across all branches',
    description: 'Lead new payment flows from inception to production deployment across 500,000+ merchants.',
    alumniSponsor: 'Ananya Sen (Lead PM)'
  },
  {
    id: 'opp_04',
    title: 'Founding Engineer / Resident Entrepreneur',
    organization: 'CodeFlow (YC W23)',
    type: 'Entrepreneurship',
    location: 'Remote / San Francisco',
    stipend: '$5,000 / month + Equity Grant',
    deadline: 'Open Until Filled',
    skills: ['Next.js', 'Rust', 'DevTools', 'Fast Prototyping'],
    eligibility: 'Passionate student builders who have shipped open-source projects',
    description: 'Work directly with founder Kabir Batra to build AI developer intelligence tooling for enterprise engineers.',
    alumniSponsor: 'Kabir Batra (Founder & CEO)'
  }
];

export const NETWORK_NODES = [
  { id: 'n1', label: 'UniConnect Hub', group: 'college', x: 250, y: 160, size: 28, meta: '12,500+ Verified Members' },
  { id: 'n2', label: 'Priya Sharma', group: 'alumni', x: 120, y: 70, size: 20, meta: 'Staff MLE @ DeepMind' },
  { id: 'n3', label: 'Arpit Bansal', group: 'alumni', x: 380, y: 80, size: 20, meta: 'Senior SWE @ Uber' },
  { id: 'n4', label: 'Ananya Sen', group: 'alumni', x: 100, y: 250, size: 20, meta: 'Lead PM @ Razorpay' },
  { id: 'n5', label: 'Varun Verma', group: 'alumni', x: 390, y: 240, size: 20, meta: 'AIR 4 / Stanford Ph.D.' },
  { id: 'n6', label: 'AI & Machine Learning', group: 'interest', x: 200, y: 50, size: 16, meta: '180+ Active Mentees' },
  { id: 'n7', label: 'Distributed Systems', group: 'interest', x: 320, y: 50, size: 16, meta: '220+ Active Mentees' },
  { id: 'n8', label: 'Google', group: 'company', x: 50, y: 120, size: 18, meta: '85+ Verified Alumni' },
  { id: 'n9', label: 'Uber', group: 'company', x: 440, y: 140, size: 18, meta: '54+ Verified Alumni' },
  { id: 'n10', label: 'Student Community', group: 'student', x: 250, y: 280, size: 22, meta: '1,800+ Students Connected' }
];

export const NETWORK_LINKS = [
  { source: 'n1', target: 'n2' },
  { source: 'n1', target: 'n3' },
  { source: 'n1', target: 'n4' },
  { source: 'n1', target: 'n5' },
  { source: 'n1', target: 'n10' },
  { source: 'n2', target: 'n6' },
  { source: 'n2', target: 'n8' },
  { source: 'n3', target: 'n7' },
  { source: 'n3', target: 'n9' },
  { source: 'n4', target: 'n10' },
  { source: 'n5', target: 'n10' },
  { source: 'n6', target: 'n10' },
  { source: 'n7', target: 'n10' }
];
