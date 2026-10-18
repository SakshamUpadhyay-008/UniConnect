import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import {
  User,
  College,
  CollegeMembership,
  StudentProfile,
  AlumniProfile,
  CareerGoal,
  EmploymentClaim,
  MentorshipRequest,
  MentorshipRelationship,
  Conversation,
  Message,
  Notification,
  Event,
} from '../models/index.js';

dotenv.config();

export const seedDatabase = async () => {
  console.log('--- [UniConnect / AlumBridge Demo Seed Script Starting] ---');

  const conn = await connectDB();
  if (!conn) {
    console.warn('[Seed Skipped] Could not establish connection to MongoDB. Please ensure MongoDB is running.');
    return;
  }

  try {
    // 1. Seed Demo College
    let college = await College.findOne({ slug: 'iiit-delhi' });
    if (!college) {
      college = await College.create({
        name: 'Indraprastha Institute of Information Technology Delhi (IIIT-Delhi)',
        slug: 'iiit-delhi',
        officialEmailDomains: ['iiitd.ac.in'],
        website: 'https://www.iiitd.ac.in',
        location: 'Okhla Phase III, Near Govind Puri Metro Station, New Delhi 110020',
        institutionStatus: 'active',
        verificationMethods: ['official_email_domain', 'institutional_sso', 'admin_manual_review'],
      });
      console.log(`[Seed] Created College: ${college.name}`);
    } else {
      console.log(`[Seed] Found existing College: ${college.name}`);
    }

    // 2. Seed Career Goals
    const careerGoalsData = [
      {
        name: 'Software Engineering',
        category: 'Engineering',
        description: 'Large-scale distributed systems, backend engineering, cloud platforms, and full-stack architecture.',
        relevantSkills: ['System Design', 'Distributed Systems', 'Golang', 'Java', 'React', 'Kubernetes'],
      },
      {
        name: 'AI & Machine Learning',
        category: 'Data Science & AI',
        description: 'Deep learning, LLMs, reinforcement learning, model deployment, and AI research.',
        relevantSkills: ['PyTorch', 'Large Language Models', 'Reinforcement Learning', 'MLOps', 'Transformers'],
      },
      {
        name: 'Product Management',
        category: 'Product & Strategy',
        description: 'Product lifecycle, customer discovery, metrics tracking, roadmap prioritisation, and cross-functional leadership.',
        relevantSkills: ['Product Strategy', 'Growth Metrics', 'A/B Testing', 'Stakeholder Management', 'Roadmapping'],
      },
      {
        name: 'Research & PhD',
        category: 'Academia & Research',
        description: 'Scientific computing, publishing tier-1 conferences, graduate school applications, and academic grants.',
        relevantSkills: ['Computer Vision', 'Robotics', 'LaTeX', 'Academic Publishing', 'Grant Writing'],
      },
      {
        name: 'Entrepreneurship',
        category: 'Venture & Startups',
        description: 'Venture capital pitching, product-market fit, zero-to-one engineering, and startup recruiting.',
        relevantSkills: ['0-to-1 Product', 'Venture Capital', 'Pitching', 'Recruiting', 'Go-To-Market'],
      },
    ];

    for (const cg of careerGoalsData) {
      await CareerGoal.findOneAndUpdate({ name: cg.name }, cg, { upsert: true, new: true });
    }
    console.log(`[Seed] Seeded ${careerGoalsData.length} standard Career Goals`);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('DemoPassword123!', salt);

    // 3. Seed Demo Students
    const studentUsersData = [
      {
        fullName: 'Rohan Gupta',
        email: 'rohan.gupta@iiitd.ac.in',
        role: 'student',
        accountStatus: 'active',
        emailVerified: true,
        degree: 'B.Tech',
        department: 'Computer Science & Engineering',
        graduationYear: 2026,
        course: 'B.Tech CSE',
        currentYear: 3,
        skills: ['Python', 'Data Structures', 'PyTorch', 'Web Development'],
        careerGoals: ['AI & Machine Learning', 'Software Engineering'],
      },
      {
        fullName: 'Simran Kaur',
        email: 'simran.kaur@iiitd.ac.in',
        role: 'student',
        accountStatus: 'active',
        emailVerified: true,
        degree: 'B.Tech',
        department: 'Electronics & Communications Engineering',
        graduationYear: 2025,
        course: 'B.Tech ECE',
        currentYear: 4,
        skills: ['System Design', 'Embedded Systems', 'Product Strategy'],
        careerGoals: ['Product Management', 'Software Engineering'],
      },
    ];

    const studentMap = {};
    for (const s of studentUsersData) {
      let u = await User.findOne({ email: s.email });
      if (!u) {
        u = await User.create({
          fullName: s.fullName,
          email: s.email,
          passwordHash,
          role: s.role,
          accountStatus: s.accountStatus,
          emailVerified: s.emailVerified,
        });
      }
      studentMap[s.email] = u;

      // Membership
      let mem = await CollegeMembership.findOne({ userId: u._id, collegeId: college._id });
      if (!mem) {
        mem = await CollegeMembership.create({
          userId: u._id,
          collegeId: college._id,
          relationshipType: 'student',
          department: s.department,
          degree: s.degree,
          graduationYear: s.graduationYear,
          affiliationStatus: 'verified',
          verificationMethod: 'official_email_token',
          verifiedAt: new Date(),
        });
      }

      // Student Profile
      await StudentProfile.findOneAndUpdate(
        { userId: u._id },
        {
          userId: u._id,
          collegeMembershipId: mem._id,
          course: s.course,
          currentYear: s.currentYear,
          skills: s.skills,
          careerGoals: s.careerGoals,
          preferredIndustries: ['Technology', 'AI / Cloud', 'Startups'],
          preferredGuidanceTypes: ['1:1 Video Mentorship', 'Resume Review', 'Mock Technical Interviews'],
          shortBio: `IIIT Delhi student passionate about building scalable technology products.`,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`[Seed] Seeded ${studentUsersData.length} Demo Student Accounts`);

    // 4. Seed Demo Alumni Profiles
    const alumniUsersData = [
      {
        fullName: 'Priya Sharma',
        email: 'priya.sharma@iiitd.alumni.ac.in',
        role: 'alumni',
        headline: 'Staff ML Engineer at Google DeepMind',
        company: 'Google DeepMind',
        jobTitle: 'Staff ML Engineer',
        skills: ['PyTorch', 'Distributed Training', 'LLMs', 'System Architecture', 'Research Papers'],
        mentorshipTopics: ['ML Systems at Scale', 'Transitioning from Academia to Deep Tech', 'System Design'],
        degree: 'B.Tech',
        department: 'Computer Science & Engineering',
        graduationYear: 2019,
        biography: 'Alumna of IIIT Delhi (B.Tech CSE 2019). Currently leading multimodal research infrastructure at Google DeepMind. Passionate about empowering students to break into top AI research labs.',
      },
      {
        fullName: 'Arpit Bansal',
        email: 'arpit.bansal@iiitd.alumni.ac.in',
        role: 'alumni',
        headline: 'Senior Product Manager at Microsoft',
        company: 'Microsoft',
        jobTitle: 'Senior Product Manager',
        skills: ['Product Strategy', 'Growth Metrics', 'A/B Testing', 'Cross-Functional Leadership'],
        mentorshipTopics: ['Transitioning from SWE to PM', 'Enterprise Product Growth', 'Executive Communication'],
        degree: 'B.Tech',
        department: 'Computer Science & Applied Mathematics',
        graduationYear: 2018,
        biography: 'B.Tech CSAM 2018. Former software developer turned Product Manager at Microsoft Azure. Helped launch cloud features used by Fortune 500 teams worldwide.',
      },
      {
        fullName: 'Ananya Sen',
        email: 'ananya.sen@iiitd.alumni.ac.in',
        role: 'alumni',
        headline: 'Principal Architect at Stripe',
        company: 'Stripe',
        jobTitle: 'Principal Architect',
        skills: ['Distributed Systems', 'Golang', 'Financial Infrastructure', 'Zero-Downtime Migration'],
        mentorshipTopics: ['High-Throughput Architecture', 'Navigating Tier-1 Tech Interviews', 'Open Source'],
        degree: 'B.Tech',
        department: 'Computer Science & Engineering',
        graduationYear: 2017,
        biography: 'B.Tech CSE 2017. Designed mission-critical global settlement pipelines processing billions daily at Stripe. Active mentor for women in computer systems engineering.',
      },
      {
        fullName: 'Varun Verma',
        email: 'varun.verma@iiitd.alumni.ac.in',
        role: 'alumni',
        headline: 'Founding Engineer at Stealth AI (Ex-Uber)',
        company: 'Stealth AI',
        jobTitle: 'Founding Engineer',
        skills: ['0-to-1 Architecture', 'FastAPI', 'Rust', 'Venture Fundraising', 'Early Stage Hiring'],
        mentorshipTopics: ['Early-Stage Startup Survival', 'Founding Engineer Playbook', 'Seed Pitching'],
        degree: 'B.Tech',
        department: 'Computer Science & Biosciences',
        graduationYear: 2020,
        biography: 'B.Tech CSB 2020. Ex-Uber Marketplace routing engineer, now building a high-growth autonomous intelligence platform backed by leading Silicon Valley investors.',
      },
    ];

    const alumniMap = {};
    for (const a of alumniUsersData) {
      let u = await User.findOne({ email: a.email });
      if (!u) {
        u = await User.create({
          fullName: a.fullName,
          email: a.email,
          passwordHash,
          role: 'alumni',
          accountStatus: 'active',
          emailVerified: true,
        });
      }
      alumniMap[a.fullName] = u;

      // Membership
      let mem = await CollegeMembership.findOne({ userId: u._id, collegeId: college._id });
      if (!mem) {
        mem = await CollegeMembership.create({
          userId: u._id,
          collegeId: college._id,
          relationshipType: 'alumni',
          department: a.department,
          degree: a.degree,
          graduationYear: a.graduationYear,
          affiliationStatus: 'verified',
          verificationMethod: 'admin_manual_review',
          verifiedAt: new Date(),
        });
      }

      // Employment Claim
      const claim = await EmploymentClaim.findOneAndUpdate(
        { userId: u._id, employerName: a.company },
        {
          userId: u._id,
          employerName: a.company,
          jobTitle: a.jobTitle,
          industry: 'Technology',
          isCurrent: true,
          claimStatus: 'verified',
          verificationMethod: 'corporate_domain_check',
          verifiedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      // Alumni Profile
      await AlumniProfile.findOneAndUpdate(
        { userId: u._id },
        {
          userId: u._id,
          collegeMembershipId: mem._id,
          professionalHeadline: a.headline,
          biography: a.biography,
          skills: a.skills,
          areasOfExpertise: a.skills.slice(0, 3),
          industries: ['Enterprise Software', 'Artificial Intelligence', 'FinTech'],
          mentorshipTopics: a.mentorshipTopics,
          currentEmploymentClaimId: claim._id,
          mentorshipAvailable: true,
          availability: {
            isAcceptingMentees: true,
            maxMenteesPerMonth: 3,
            preferredFormat: 'Video Call (30 min)',
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`[Seed] Seeded ${alumniUsersData.length} Demo Alumni Accounts with Profiles & Verified Affiliations`);

    // 5. Seed Demo Mentorship Request
    const rohan = studentMap['rohan.gupta@iiitd.ac.in'];
    const priya = alumniMap['Priya Sharma'];
    if (rohan && priya) {
      await MentorshipRequest.findOneAndUpdate(
        { studentUserId: rohan._id, alumniUserId: priya._id },
        {
          studentUserId: rohan._id,
          alumniUserId: priya._id,
          collegeId: college._id,
          subject: 'Guidance on Distributed PyTorch Training & System Design',
          personalisedMessage:
            "Hi Priya, I am a 3rd-year CSE student at IIIT Delhi specializing in deep learning systems. I've been reading your paper on distributed transformer training and would love 20 minutes to understand how you approached cluster orchestration.",
          requestedGuidance: 'ML Systems at Scale',
          preferredMeetingFormat: 'video',
          status: 'pending',
        },
        { upsert: true }
      );
      console.log('[Seed] Seeded Demo Mentorship Request (Rohan -> Priya Sharma)');
    }

    // 6. Seed Demo Event
    await Event.findOneAndUpdate(
      { collegeId: college._id, title: 'From Campus to Big Tech: System Design & Career Transitions AMA' },
      {
        collegeId: college._id,
        title: 'From Campus to Big Tech: System Design & Career Transitions AMA',
        description:
          'Join IIIT Delhi alumni Priya Sharma (Google DeepMind) and Ananya Sen (Stripe) for an interactive AMA session on navigating technical interviews, mastering system architecture, and landing roles at top tech companies.',
        eventType: 'ama_session',
        organiserUserId: priya ? priya._id : rohan._id,
        startAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
        location: {
          isVirtual: true,
          meetingUrl: 'https://meet.google.com/demo-iiitd-ama',
          venueAddress: 'Virtual (Google Meet)',
        },
        capacity: 150,
        visibility: 'college_only',
        status: 'published',
      },
      { upsert: true }
    );
    console.log('[Seed] Seeded Demo College Event');

    console.log('--- [UniConnect / AlumBridge Demo Seed Completed Successfully] ---');
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed Error] Failed to complete database seeding:', error.message);
  }
};

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('seed.js')) {
  seedDatabase().then(() => process.exit(0));
}
