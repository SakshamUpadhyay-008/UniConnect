import mongoose from 'mongoose';

const institutionalIntegrationSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
      index: true,
    },
    integrationType: {
      type: String,
      enum: ['csv_import', 'rest_api', 'ldap_sso', 'banner_sis', 'custom_webhook'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'failed', 'deprecated'],
      default: 'draft',
      index: true,
    },
    syncMode: {
      type: String,
      enum: ['manual', 'scheduled_daily', 'scheduled_weekly', 'realtime'],
      default: 'manual',
    },
    lastSyncAt: {
      type: Date,
    },
    lastSyncStatus: {
      type: String,
      enum: ['success', 'partial_failure', 'failed', null],
      default: null,
    },
    // Secrets/API credentials must NEVER be placed here; store only KMS/Secret Manager key references
    configurationReference: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

institutionalIntegrationSchema.index({ collegeId: 1, integrationType: 1 });

export default mongoose.models.InstitutionalIntegration ||
  mongoose.model('InstitutionalIntegration', institutionalIntegrationSchema);
