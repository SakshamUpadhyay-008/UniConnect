import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actorUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    resourceType: {
      type: String,
      required: true,
      index: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    outcome: {
      type: String,
      enum: ['success', 'failure', 'denied'],
      default: 'success',
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    requestCorrelationId: {
      type: String,
      trim: true,
    },
    // Sanitized metadata strictly without passwords, tokens, full identity documents, or secrets
    safeMetadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: false,
  }
);

auditLogSchema.index({ collegeId: 1, timestamp: -1 });
auditLogSchema.index({ actorUserId: 1, timestamp: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
