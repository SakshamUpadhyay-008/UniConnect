import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
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
  SavedAlumni,
} from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());

// Initialize DB connection
connectDB();

// -------------------------------------------------------------
// Health Check & System Status
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'AlumBridge / UniConnect API',
    version: '1.0.0',
    college: 'IIIT Delhi (Demo Institution)',
    database: 'MongoDB with Mongoose ODM',
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// Colleges API (B2B Multi-College Architecture)
// -------------------------------------------------------------
app.get('/api/colleges', async (req, res) => {
  try {
    const colleges = await College.find({ institutionStatus: 'active' })
      .select('name slug officialEmailDomains website location verificationMethods')
      .lean();
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/colleges/:slug', async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug }).lean();
    if (!college) {
      return res.status(404).json({ success: false, message: 'College institution not found' });
    }
    res.json({ success: true, data: college });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// Career Goals API
// -------------------------------------------------------------
app.get('/api/career-goals', async (req, res) => {
  try {
    const goals = await CareerGoal.find({ isActive: true }).lean();
    res.json({ success: true, count: goals.length, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// Alumni Discovery API (with deterministic matching & filtering)
// -------------------------------------------------------------
app.get('/api/alumni', async (req, res) => {
  try {
    const { skill, company, mentorshipAvailable, goal, search } = req.query;

    const query = {};
    if (mentorshipAvailable === 'true') {
      query.mentorshipAvailable = true;
    }
    if (skill) {
      query.skills = { $in: [new RegExp(skill, 'i')] };
    }
    if (company) {
      query.professionalHeadline = { $regex: company, $options: 'i' };
    }

    const profiles = await AlumniProfile.find(query)
      .populate('userId', 'fullName profileImage role accountStatus email')
      .populate('collegeMembershipId', 'degree department graduationYear affiliationStatus')
      .lean();

    // Map into clean client-safe DTOs
    const safeProfiles = profiles.map((p) => {
      const user = p.userId || {};
      const mem = p.collegeMembershipId || {};
      return {
        _id: p._id,
        userId: user._id,
        name: user.fullName || 'Alumnus',
        avatar: user.profileImage || '',
        headline: p.professionalHeadline,
        biography: p.biography,
        skills: p.skills || [],
        areasOfExpertise: p.areasOfExpertise || [],
        mentorshipTopics: p.mentorshipTopics || [],
        mentorshipAvailable: p.mentorshipAvailable,
        graduationYear: mem.graduationYear || 'Alum',
        degree: mem.degree || 'B.Tech',
        department: mem.department || 'Computer Science & Engineering',
        affiliationStatus: mem.affiliationStatus || 'verified',
        isDemoData: true,
      };
    });

    res.json({ success: true, count: safeProfiles.length, data: safeProfiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// Mentorship Request Flow
// -------------------------------------------------------------
app.post('/api/mentorship-requests', async (req, res) => {
  try {
    const {
      studentUserId,
      alumniUserId,
      collegeId,
      subject,
      personalisedMessage,
      requestedGuidance,
      preferredMeetingFormat,
    } = req.body;

    if (!studentUserId || !alumniUserId || !personalisedMessage || !requestedGuidance) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing: studentUserId, alumniUserId, personalisedMessage, requestedGuidance',
      });
    }

    // Check if duplicate pending request exists
    const existing = await MentorshipRequest.findOne({
      studentUserId,
      alumniUserId,
      status: 'pending',
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A pending mentorship request has already been submitted to this mentor.',
      });
    }

    const newRequest = new MentorshipRequest({
      studentUserId,
      alumniUserId,
      collegeId: collegeId || undefined,
      subject: subject || 'Mentorship Guidance Request via AlumBridge',
      personalisedMessage,
      requestedGuidance,
      preferredMeetingFormat: preferredMeetingFormat || 'video',
      status: 'pending',
    });

    await newRequest.save();

    // Create a notification for the recipient alumnus
    try {
      await Notification.create({
        recipientUserId: alumniUserId,
        type: 'mentorship_request',
        title: 'New Mentorship Request Received',
        message: `A student has requested guidance on ${requestedGuidance}.`,
        relatedEntityType: 'MentorshipRequest',
        relatedEntityId: newRequest._id,
      });
    } catch (notifErr) {
      // Non-blocking notification error
      console.warn('Notification creation skipped:', notifErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Mentorship request submitted successfully. Awaiting alumni voluntary response.',
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// Events API
// -------------------------------------------------------------
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({ status: 'published' })
      .populate('organiserUserId', 'fullName')
      .sort({ startAt: 1 })
      .lean();
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// Error Handling Middleware
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`[UniConnect / AlumBridge Server] Started on port ${PORT}`);
  console.log(`[Architecture] Multi-college B2B MongoDB Architecture`);
  console.log(`[Frontend URL] ${CORS_ORIGIN}`);
  console.log(`=======================================================`);
});

export default app;
