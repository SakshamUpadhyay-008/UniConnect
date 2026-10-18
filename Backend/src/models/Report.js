import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
      index: true,
    },
    reportType: {
      type: String,
      enum: ['harassment', 'impersonation', 'fraudulent_claim', 'spam', 'inappropriate_content', 'other'],
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'reviewing', 'resolved', 'dismissed'],
      default: 'open',
      index: true,
    },
    assignedReviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolutionNotes: {
      type: String,
      select: false,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ collegeId: 1, status: 1 });
reportSchema.index({ reportedUserId: 1, status: 1 });

export default mongoose.models.Report || mongoose.model('Report', reportSchema);
