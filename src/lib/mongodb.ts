// lib/mongodb.js
import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: unknown, promise: Promise<unknown> | null } | undefined;
}


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
type MongooseCache = { conn: unknown, promise: Promise<unknown> | null };

const cached: MongooseCache = (globalThis as unknown as { mongoose: MongooseCache }).mongoose || ((globalThis as unknown as { mongoose: MongooseCache }).mongoose = { conn: null, promise: null });

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;