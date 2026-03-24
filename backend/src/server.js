import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDatabase(env.mongoUri);
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`🚀 Backend running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
