import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import generationRoutes from './routes/generationRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/generate', generationRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
