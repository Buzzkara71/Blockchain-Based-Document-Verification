import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Anda harus login.' });
  }
  const { ethAddress } = req.body;
  if (!ethAddress || !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    return res.status(400).json({ message: 'Alamat Ethereum tidak valid.' });
  }

  try {
    await dbConnect();
    const userEmail = session.user.email;
    
    const existingWalletUser = await User.findOne({ ethAddress: ethAddress.toLowerCase() });
    if (existingWalletUser && existingWalletUser.email !== userEmail) {
      return res.status(409).json({ message: 'Dompet ini sudah ditautkan ke akun lain.' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { ethAddress: ethAddress.toLowerCase() } }, // <-- Pastikan ini juga lowercase
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Dompet berhasil ditautkan!' });
  } catch (error) {
    console.error('API Error /link-wallet:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
}