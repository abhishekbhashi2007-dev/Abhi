import { DailyUsage } from '../models/DailyUsage.js';
import { getUtcDateKey } from '../utils/date.js';

export async function consumeDailyQuota(userId, limit) {
  const dateKey = getUtcDateKey();
  const usage = await DailyUsage.findOneAndUpdate(
    { userId, dateKey },
    { $inc: { count: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (usage.count > limit) {
    await DailyUsage.updateOne({ _id: usage._id }, { $inc: { count: -1 } });
    return { allowed: false, remaining: 0, used: limit };
  }

  return {
    allowed: true,
    remaining: Math.max(limit - usage.count, 0),
    used: usage.count,
  };
}

export async function getDailyQuota(userId, limit) {
  const dateKey = getUtcDateKey();
  const usage = await DailyUsage.findOne({ userId, dateKey });
  const used = usage?.count || 0;
  return {
    used,
    remaining: Math.max(limit - used, 0),
    limit,
  };
}
