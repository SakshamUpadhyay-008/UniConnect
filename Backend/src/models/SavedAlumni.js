import mongoose from 'mongoose';

const savedAlumniSchema = new mongoose.Schema(
  {
    studentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    alumniUserId: {
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Prevent duplicate bookmarking/saving of the same alumnus by a student
savedAlumniSchema.index(
  { studentUserId: 1, alumniUserId: 1 },
  { unique: true }
);

export default mongoose.models.SavedAlumni ||
  mongoose.model('SavedAlumni', savedAlumniSchema);
