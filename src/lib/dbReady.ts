// Ensures a single, eagerly-evaluated Mongo connection per Lambda cold start
import dbConnect from '@/lib/mongodb';

// Immediately kick off (and export) the connection promise.
// Other modules can `await dbReady` without re-invoking dbConnect.
const dbReady = dbConnect();
export default dbReady;
