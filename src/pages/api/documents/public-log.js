import Document from '../../../models/Document';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await dbConnect();

    // Ambil 50 dokumen terbaru
    const publicDocs = await Document.find({})
      .sort({ timestamp: -1 })
      .limit(50)
      // Hanya pilih field yang aman untuk ditampilkan ke publik
      .select('transactionHash uploaderAddress timestamp');

    res.status(200).json(publicDocs);
  } catch (error) {
    console.error("API Public Log Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}