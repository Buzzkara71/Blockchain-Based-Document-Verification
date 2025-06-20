import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const { address } = req.query; 

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ message: 'Invalid Ethereum address format.' });
  }

  try {
    await dbConnect();

    console.log(`[API /user] Mencari alamat: ${address}`);

    // --- PERBAIKAN LOGIKA INTI ADA DI SINI ---
    // Kita akan mencari berdasarkan versi lowercase dari alamat untuk memastikan
    // perbandingan yang konsisten dan tidak case-sensitive.
    const user = await User.findOne({ 
      ethAddress: address.toLowerCase() 
    }).select('name email image'); // Hanya pilih data publik

    if (!user) {
      console.log(`[API /user] GAGAL: Pengguna tidak ditemukan untuk alamat ${address}`);
      return res.status(404).json({ message: 'Uploader not found for this address.' });
    }

    // Jika pengguna ditemukan
    console.log(`[API /user] SUKSES: Pengguna ditemukan:`, user);
    res.status(200).json(user);
    
  } catch (error) {
    console.error('[API /user] Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}