import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) throw new Error('Add MONGODB_URI in Vercel');

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function GET() {
  const client = await clientPromise;
  const db = client.db("nexus");
  const messages = await db.collection("messages").find({}).sort({ timestamp: -1 }).limit(50).toArray();
  return Response.json(messages.reverse());
}

export async function POST(req) {
  const { name, message } = await req.json();
  if (!name || !message) return Response.json({ error: "Missing" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("nexus");
  await db.collection("messages").insertOne({ name, message, timestamp: new Date() });
  return Response.json({ success: true });
}