import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    collegeMembershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeMembership',
      required: [true, 'College membership reference is required'],
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    currentYear: {
      type: Number,
      min: 1,
      max: 6,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    careerGoals: {
      type: [String],
      default: [],
    },
    preferredIndustries: {
      type: [String],
      default: [],
    },
    preferredGuidanceTypes: {
      type: [String],
      default: [],
    },
    shortBio: {
      type: String,
      maxlength: 600,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

studentProfileSchema.index({ userId: 1 }, { unique: true });
studentProfileSchema.index({ collegeMembershipId: 1 });
studentProfileSchema.index({ careerGoals: 1, currentYear: 1 });

export default mongoose.models.StudentProfile ||
  mongoose.model('StudentProfile', studentProfileSchema);
