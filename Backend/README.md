# UniConnect / AlumBridge — B2B Multi-College MongoDB Backend Architecture

This backend implements the production-grade MongoDB database architecture for **UniConnect / AlumBridge**, supporting institutional multi-college isolation, student identity, alumni career mentorship, employment provenance, and messaging authorization.

## 📁 Backend Directory Structure
```
Backend/
  src/
    config/
      db.js                    # Resilient Mongoose connection with fallback handling
    models/
      User.js                  # Identity, auth, role-based access (student, alumni, collegeAdmin)
      College.js               # Multi-college institutional entities & verified domains
      CollegeMembership.js     # User-to-college affiliations with compound unique index
      StudentProfile.js        # Course, current year, career goals, target industries
      AlumniProfile.js         # Voluntary availability, headline, skills, mentorship topics
      CareerGoal.js            # Standardized taxonomy (SWE, AI/ML, PM, Research, etc.)
      EmploymentClaim.js       # Self-reported vs verified claims with audit trail
      MentorshipRequest.js     # Requests lifecycle (pending, accepted, declined, expired)
      MentorshipRelationship.js# Active mentorship instances created only upon acceptance
      Conversation.js          # Direct 2-participant messaging authorization gate
      Message.js               # Paginated message history with read receipts
      Notification.js          # Real-time lifecycle alerts and updates
      VerificationRecord.js    # Academic & employment verification provenance
      InstitutionalIntegration.js # SIS/SSO/CSV ingestion connector configurations
      AuditLog.js              # Security-critical administrative action logs
      Report.js                # Trust & safety abuse reporting system
      Event.js                 # College-scoped AMAs, workshops, and webinars
      EventRegistration.js     # Attendance tracking with duplicate prevention
      SavedAlumni.js           # Student bookmarking with compound unique index
      index.js                 # Unified models barrel export
    scripts/
      seed.js                  # Idempotent demo seed script for IIIT Delhi
      testModels.js            # Unit test suite verifying schemas & security constraints
    server.js                  # Express API server with CORS and REST endpoints
  .env                         # Local environment variables
  .env.example                 # Safe environment template
  .gitignore                   # Git exclusion rules
  package.json                 # ES module package definition & scripts
```

## ⚙️ Environment Variables (`.env`)
```env
MONGODB_URI=mongodb://127.0.0.1:27017/uniconnect_db
PORT=5000
JWT_SECRET=dev_uniconnect_secure_secret_key_sample_replace_in_prod_env
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Commands
```bash
# Install dependencies
npm install

# Run database model validation tests (12/12 passing)
npm test

# Seed demo data (IIIT Delhi, demo students, verified alumni, events)
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

## 🛡️ Security & Privacy Guarantees
1. **Password Protection**: User model enforces bcrypt hashing before save and strips `passwordHash` in `.toJSON()` output.
2. **Voluntary Mentorship**: `AlumniProfile.mentorshipAvailable` defaults strictly to `false` until explicitly toggled.
3. **Unverified Claims Protected**: `EmploymentClaim.claimStatus` defaults to `selfReported` to avoid false representation.
4. **Duplicate Prevention**: Compound unique indexes on `CollegeMembership ({ userId, collegeId })`, `EventRegistration ({ eventId, userId })`, and `SavedAlumni ({ studentUserId, alumniUserId })`.
5. **Confidential Evidence Guard**: `VerificationRecord.evidenceReference` and `reviewerNotes` declare `select: false` to prevent accidental data leaks.
6. **Messaging Authorization**: `Conversation` strictly validates exactly 2 participants and requires an approved `MentorshipRelationship`.
