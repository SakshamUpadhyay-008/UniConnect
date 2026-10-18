import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    registrationStatus: {
      type: String,
      enum: ['registered', 'waitlisted', 'cancelled'],
      default: 'registered',
      index: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    attendanceStatus: {
      type: String,
      enum: ['pending', 'attended', 'absent'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations for the same user and event
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export default mongoose.models.EventRegistration ||
  mongoose.model('EventRegistration', eventRegistrationSchema);
