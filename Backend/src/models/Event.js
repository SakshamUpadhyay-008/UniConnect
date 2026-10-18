import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: [
        'webinar',
        'workshop',
        'ama_session',
        'networking_mixer',
        'career_fair',
        'panel_discussion',
      ],
      required: true,
    },
    organiserUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
      index: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    location: {
      isVirtual: {
        type: Boolean,
        default: true,
      },
      meetingUrl: {
        type: String,
        trim: true,
      },
      venueAddress: {
        type: String,
        trim: true,
      },
    },
    registrationDeadline: {
      type: Date,
    },
    capacity: {
      type: Number,
      min: 1,
    },
    visibility: {
      type: String,
      enum: ['college_only', 'department_only', 'invite_only', 'public'],
      default: 'college_only',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'published',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ collegeId: 1, status: 1, startAt: 1 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
