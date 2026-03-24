import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 5000,
    },
    projectType: {
      type: String,
      enum: ['mobile-app', 'web-app', 'website', 'game', 'unknown'],
      default: 'unknown',
      index: true,
    },
    needsClarification: {
      type: Boolean,
      default: false,
    },
    clarificationQuestion: {
      type: String,
      default: '',
    },
    explanation: {
      type: String,
      required: true,
    },
    files: [
      {
        path: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

generationSchema.index({ userId: 1, createdAt: -1 });

export const Generation = mongoose.model('Generation', generationSchema);
