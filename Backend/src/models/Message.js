import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Conversation reference is required'],
    },
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender user reference is required'],
    },
    messageType: {
      type: String,
      enum: ['text', 'attachment'],
      default: 'text',
    },
    content: {
      type: String,
      required: [true, 'Message content cannot be empty'],
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
      trim: true,
    },
    attachmentReferences: {
      type: [String],
      default: [],
    },
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ senderUserId: 1 });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
