import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema(
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
    professionalHeadline: {
      type: String,
      trim: true,
      maxlength: 150,
      default: '',
    },
    biography: {
      type: String,
      maxlength: 1200,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    areasOfExpertise: {
      type: [String],
      default: [],
    },
    industries: {
      type: [String],
      default: [],
    },
    mentorshipTopics: {
      type: [String],
      default: [],
    },
    currentEmploymentClaimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmploymentClaim',
    },
    previousEducation: [
      {
        institution: String,
        degree: String,
        year: Number,
      },
    ],
    professionalExperienceReferences: {
      type: [String],
      default: [],
    },
    // CRITICAL: Alumni control their availability. Never auto-enroll.
    mentorshipAvailable: {
      type: Boolean,
      default: false,
    },
    mentorshipPreferences: {
      maxMenteesPerMonth: {
        type: Number,
        default: 3,
        min: 1,
        max: 20,
      },
      preferredFormats: {
        type: [String],
        default: ['Async Review', '1:1 Call'],
      },
    },
    availability: {
      isAcceptingRequests: {
        type: Boolean,
        default: true,
      },
      pauseReason: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

alumniProfileSchema.index({ userId: 1 }, { unique: true });
alumniProfileSchema.index({ collegeMembershipId: 1 });
alumniProfileSchema.index({ mentorshipAvailable: 1, 'availability.isAcceptingRequests': 1 });
alumniProfileSchema.index({ skills: 1, areasOfExpertise: 1 });

export default mongoose.models.AlumniProfile ||
  mongoose.model('AlumniProfile', alumniProfileSchema);
