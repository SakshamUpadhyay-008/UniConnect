import mongoose from 'mongoose';

const careerGoalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Career goal name is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Career category is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    relevantSkills: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

careerGoalSchema.index({ category: 1, isActive: 1 });
careerGoalSchema.index({ name: 1 }, { unique: true });

export default mongoose.models.CareerGoal ||
  mongoose.model('CareerGoal', careerGoalSchema);
