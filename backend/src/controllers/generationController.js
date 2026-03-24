import { env } from '../config/env.js';
import { Generation } from '../models/Generation.js';
import { generateProjectFromPrompt } from '../services/aiService.js';
import { consumeDailyQuota, getDailyQuota } from '../services/usageService.js';

export async function createGeneration(req, res) {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  if (prompt.length > 5000) {
    return res.status(400).json({ message: 'Prompt is too long (max 5000 chars)' });
  }

  const quota = await consumeDailyQuota(req.user.id, env.dailyRequestLimit);
  if (!quota.allowed) {
    return res.status(429).json({
      message: `Daily limit reached (${env.dailyRequestLimit} requests). Try again tomorrow.`,
      quota,
    });
  }

  const result = await generateProjectFromPrompt({
    prompt,
    apiKey: env.openAiApiKey,
    model: env.openAiModel,
  });

  const record = await Generation.create({
    userId: req.user.id,
    prompt,
    projectType: result.projectType,
    needsClarification: result.needsClarification,
    clarificationQuestion: result.clarificationQuestion,
    explanation: result.explanation,
    files: result.files,
  });

  return res.status(201).json({
    id: record._id,
    prompt: record.prompt,
    projectType: record.projectType,
    needsClarification: record.needsClarification,
    clarificationQuestion: record.clarificationQuestion,
    explanation: record.explanation,
    files: record.files,
    createdAt: record.createdAt,
    quota: {
      used: quota.used,
      remaining: quota.remaining,
      limit: env.dailyRequestLimit,
    },
  });
}

export async function listHistory(req, res) {
  const items = await Generation.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const quota = await getDailyQuota(req.user.id, env.dailyRequestLimit);
  return res.json({ items, quota });
}
