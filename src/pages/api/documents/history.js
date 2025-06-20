import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import Document from '../../../models/Document';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  console.log("--- API /documents/history CALLED ---");
  if (req.method !== 'GET') return res.status(405).end();
  
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    console.log("API Error: No session found. Unauthorized.");
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("Session found for user:", session.user.email);

  try {
    await dbConnect();
    console.log("Database connected.");

    console.log(`Querying documents for uploaderEmail: ${session.user.email}`);
    const documents = await Document.find({ uploaderEmail: session.user.email }).sort({ timestamp: -1 });
    
    console.log(`Found ${documents.length} documents.`);
    
    res.status(200).json(documents);
  } catch (error) {
    console.error("API History Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}