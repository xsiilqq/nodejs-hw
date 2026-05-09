import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined');
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log('✅ MongoDB connection established successfully');
};
