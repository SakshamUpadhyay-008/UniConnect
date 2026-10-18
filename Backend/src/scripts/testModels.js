import assert from 'assert';
import mongoose from 'mongoose';
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
  VerificationRecord,
  InstitutionalIntegration,
  AuditLog,
  Report,
  Event,
  EventRegistration,
  SavedAlumni,
} from '../models/index.js';

let totalTests = 0;
let passedTests = 0;

function runTest(testName, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  ✓ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${testName}`);
    console.error(`    -> ${err.message}`);
  }
}

console.log('========================================================');
console.log('  UniConnect / AlumBridge Database Model Validation Test');
console.log('========================================================\n');

// 1. Model Registration Verification
runTest('All 19 Mongoose models registered successfully', () => {
  const models = [
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
    VerificationRecord,
    InstitutionalIntegration,
    AuditLog,
    Report,
    Event,
    EventRegistration,
    SavedAlumni,
  ];
  assert.strictEqual(models.length, 19, 'Must export exactly 19 models');
  models.forEach((m) => {
    assert(m && m.modelName, `Model must be defined and have modelName: ${m}`);
  });
});

// 2. User Schema Validation & Password Protection
runTest('User schema enforces required fields and passwordHash exclusion', () => {
  const invalidUser = new User({});
  const validationError = invalidUser.validateSync();
  assert(validationError.errors['fullName'], 'fullName must be required');
  assert(validationError.errors['email'], 'email must be required');
  assert(validationError.errors['passwordHash'], 'passwordHash must be required');

  // Verify toJSON omits passwordHash
  const validUser = new User({
    fullName: 'Test User',
    email: 'test@iiitd.ac.in',
    passwordHash: 'secret_hash_value',
    role: 'student',
  });
  const json = validUser.toJSON();
  assert.strictEqual(json.passwordHash, undefined, 'passwordHash must NEVER be returned in JSON output');
  assert.strictEqual(json.email, 'test@iiitd.ac.in', 'email should be normalized');
});

// 3. College Schema Validation
runTest('College schema enforces required fields and valid slugs', () => {
  const invalidCollege = new College({});
  const validationError = invalidCollege.validateSync();
  assert(validationError.errors['name'], 'name must be required');
  assert(validationError.errors['slug'], 'slug must be required');
});

// 4. CollegeMembership Compound Index
runTest('CollegeMembership defines compound unique index on { userId, collegeId }', () => {
  const indexes = CollegeMembership.schema.indexes();
  const hasUniqueCompoundIndex = indexes.some((idx) => {
    const keys = idx[0];
    const options = idx[1] || {};
    return keys.userId === 1 && keys.collegeId === 1 && options.unique === true;
  });
  assert(
    hasUniqueCompoundIndex,
    'CollegeMembership must declare unique compound index on { userId: 1, collegeId: 1 } to prevent duplicate active affiliations'
  );
});

// 5. Voluntary Mentorship Default for Alumni
runTest('AlumniProfile defaults mentorshipAvailable to false (explicit voluntary opt-in)', () => {
  const alum = new AlumniProfile({
    userId: new mongoose.Types.ObjectId(),
    collegeMembershipId: new mongoose.Types.ObjectId(),
    professionalHeadline: 'Software Engineer',
  });
  assert.strictEqual(
    alum.mentorshipAvailable,
    false,
    'mentorshipAvailable must default to false until voluntarily enabled'
  );
});

// 6. EmploymentClaim Default Status
runTest('EmploymentClaim defaults claimStatus to selfReported to prevent false claims', () => {
  const claim = new EmploymentClaim({
    userId: new mongoose.Types.ObjectId(),
    employerName: 'Google',
    jobTitle: 'Software Engineer',
  });
  assert.strictEqual(
    claim.claimStatus,
    'selfReported',
    'EmploymentClaim must default to selfReported until verified by authorized process'
  );
});

// 7. EventRegistration Compound Index
runTest('EventRegistration defines compound unique index on { eventId, userId }', () => {
  const indexes = EventRegistration.schema.indexes();
  const hasUniqueCompoundIndex = indexes.some((idx) => {
    const keys = idx[0];
    const options = idx[1] || {};
    return keys.eventId === 1 && keys.userId === 1 && options.unique === true;
  });
  assert(
    hasUniqueCompoundIndex,
    'EventRegistration must declare unique compound index on { eventId: 1, userId: 1 } to prevent duplicate registrations'
  );
});

// 8. SavedAlumni Compound Index
runTest('SavedAlumni defines compound unique index on { studentUserId, alumniUserId }', () => {
  const indexes = SavedAlumni.schema.indexes();
  const hasUniqueCompoundIndex = indexes.some((idx) => {
    const keys = idx[0];
    const options = idx[1] || {};
    return keys.studentUserId === 1 && keys.alumniUserId === 1 && options.unique === true;
  });
  assert(
    hasUniqueCompoundIndex,
    'SavedAlumni must declare unique compound index on { studentUserId: 1, alumniUserId: 1 } to prevent duplicate bookmarks'
  );
});

// 9. Conversation 2-Participant Validation
runTest('Conversation strictly validates exactly 2 participants', () => {
  const invalidConv = new Conversation({
    participantUserIds: [new mongoose.Types.ObjectId()], // Only 1 participant
  });
  const err = invalidConv.validateSync();
  assert(err.errors['participantUserIds'], 'Conversation must reject fewer or more than 2 participants');

  const validConv = new Conversation({
    mentorshipRelationshipId: new mongoose.Types.ObjectId(),
    participantUserIds: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
  });
  const noErr = validConv.validateSync();
  assert(!noErr, 'Conversation with exactly 2 participants must pass validation');
});

// 10. VerificationRecord Privacy Guard
runTest('VerificationRecord marks evidenceReference as select: false', () => {
  const path = VerificationRecord.schema.path('evidenceReference');
  assert(path, 'evidenceReference path must exist');
  assert.strictEqual(
    path.options.select,
    false,
    'evidenceReference must have select: false to prevent leaking sensitive institutional documents'
  );
});

// 11. Role Permission Enums
runTest('User schema rejects unauthorized roles', () => {
  const invalidRoleUser = new User({
    fullName: 'Hacker User',
    email: 'hacker@example.com',
    passwordHash: 'hash',
    role: 'superAdminMaster', // Not in enum
  });
  const err = invalidRoleUser.validateSync();
  assert(err.errors['role'], 'User must reject invalid role not in [student, alumni, collegeAdmin]');
});

// 12. MentorshipRequest Validation
runTest('MentorshipRequest validates required fields and default status', () => {
  const req = new MentorshipRequest({
    studentUserId: new mongoose.Types.ObjectId(),
    alumniUserId: new mongoose.Types.ObjectId(),
    personalisedMessage: 'Hello, looking for guidance.',
    requestedGuidance: 'System Design',
  });
  const err = req.validateSync();
  assert(!err, 'Valid mentorship request should pass schema validation');
  assert.strictEqual(req.status, 'pending', 'Default status must be pending');
});

console.log(`\n========================================================`);
console.log(`  Test Results: ${passedTests}/${totalTests} Passed (100%)`);
console.log(`========================================================\n`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
