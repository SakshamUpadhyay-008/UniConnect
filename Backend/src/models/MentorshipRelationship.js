import mongoose from 'mongoose';

const mentorshipRelationshipSchema = new mongoose.Schema(
  {
    mentorshipRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MentorshipRequest',
      required: [true, 'Accepted mentorship request reference is required'],
      unique: true,
    },
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
      required: [true, 'College reference is required'],
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'ended'],
      default: 'active',
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

mentorshipRelationshipSchema.index({ mentorshipRequestId: 1 }, { unique: true });
mentorshipRelationshipSchema.index({ studentUserId: 1, alumniUserId: 1, status: 1 });
mentorshipRelationshipSchema.index({ collegeId: 1, status: 1 });

export default mongoose.models.MentorshipRelationship ||
  mongoose.model('MentorshipRelationship', mentorshipRelationshipSchema);
