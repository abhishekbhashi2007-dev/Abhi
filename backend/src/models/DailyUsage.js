import mongoose from 'mongoose';

const dailyUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    dateKey: {
      type: String,
      required: true,
      index: true,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

dailyUsageSchema.index({ userId: 1, dateKey: 1 }, { unique: true });

export const DailyUsage = mongoose.model('DailyUsage', dailyUsageSchema);
