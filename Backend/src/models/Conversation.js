import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    mentorshipRelationshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MentorshipRelationship',
      required: [true, 'Mentorship relationship reference is required'],
      unique: true,
    },
    participantUserIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 2;
        },
        message: 'A direct mentorship conversation must have exactly two participants',
      },
      required: true,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    lastMessagePreview: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ mentorshipRelationshipId: 1 }, { unique: true });
conversationSchema.index({ participantUserIds: 1, lastMessageAt: -1 });

export default mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema);
