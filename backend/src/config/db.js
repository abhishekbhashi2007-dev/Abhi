import mongoose from 'mongoose';

export async function connectDatabase(mongoUri) {
  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });
  console.log('✅ MongoDB connected');
}
