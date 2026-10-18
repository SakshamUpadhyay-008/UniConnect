import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient user reference is required'],
    },
    type: {
      type: String,
      enum: [
        'request_received',
        'mentorship_request',
        'request_accepted',
        'request_declined',
        'new_message',
        'verification_update',
        'system',
      ],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
    },
    relatedEntityType: {
      type: String,
      enum: [
        'MentorshipRequest',
        'MentorshipRelationship',
        'Conversation',
        'VerificationRecord',
        'Event',
      ],
    },
    relatedEntityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipientUserId: 1, isRead: 1, createdAt: -1 });

export default mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
