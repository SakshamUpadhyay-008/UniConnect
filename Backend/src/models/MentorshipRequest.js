import mongoose from 'mongoose';

const mentorshipRequestSchema = new mongoose.Schema(
  {
    studentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student user ID is required'],
    },
    alumniUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Alumni user ID is required'],
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    careerGoalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerGoal',
    },
    subject: {
      type: String,
      default: 'Mentorship Guidance Request via AlumBridge',
      trim: true,
      maxlength: 200,
    },
    personalisedMessage: {
      type: String,
      required: [true, 'Personalised proposal message is required'],
      maxlength: 2000,
    },
    requestedGuidance: {
      type: String,
      required: [true, 'Specific requested guidance is required'],
      maxlength: 1000,
    },
    preferredMeetingFormat: {
      type: String,
      default: 'video',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'withdrawn', 'expired'],
      default: 'pending',
    },
    alumniResponseMessage: {
      type: String,
      maxlength: 1000,
      default: '',
    },
    respondedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

mentorshipRequestSchema.index({ studentUserId: 1, alumniUserId: 1, status: 1 });
mentorshipRequestSchema.index({ alumniUserId: 1, status: 1, createdAt: -1 });
mentorshipRequestSchema.index({ collegeId: 1, status: 1 });

export default mongoose.models.MentorshipRequest ||
  mongoose.model('MentorshipRequest', mentorshipRequestSchema);
