import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Unique slug identifier is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    officialEmailDomains: {
      type: [String],
      required: [true, 'At least one official institutional domain is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A college must specify at least one authorized email domain',
      },
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    institutionStatus: {
      type: String,
      enum: ['pending', 'active', 'suspended'],
      default: 'active',
    },
    verificationMethods: {
      type: [String],
      default: ['emailDomain', 'registryMatch', 'authorizedManualReview'],
    },
  },
  {
    timestamps: true,
  }
);

collegeSchema.index({ slug: 1 }, { unique: true });
collegeSchema.index({ institutionStatus: 1 });

export default mongoose.models.College || mongoose.model('College', collegeSchema);
