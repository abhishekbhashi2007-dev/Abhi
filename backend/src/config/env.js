import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGO_URI', 'JWT_SECRET'];
required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  dailyRequestLimit: Number(process.env.DAILY_REQUEST_LIMIT || 10),
};
