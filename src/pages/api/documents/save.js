import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import Document from '../../../models/Document';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email || !session?.user?.name) {
    return res.status(401).json({ message: "Unauthorized or user session is incomplete." });
  }

  const { fileName, fileHash, transactionHash, uploaderAddress } = req.body;
  if (!fileName || !fileHash || !transactionHash || !uploaderAddress) {
      return res.status(400).json({ message: "Bad Request: Missing required fields." });
  }

  try {
    await dbConnect();
    
    const newDocument = new Document({
      fileName,
      fileHash,
      transactionHash,
      uploaderEmail: session.user.email,
      uploaderName: session.user.name,
      uploaderAddress: uploaderAddress, // Menyimpan alamat dompet
    });

    await newDocument.save();
    
    res.status(201).json({ success: true, message: "Document metadata saved successfully." });
  } catch (error) {
    console.error("API Save Error:", error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Conflict: This document or transaction has already been registered." });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}