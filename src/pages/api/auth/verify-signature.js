import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { address, message, signature } = req.body;

    if (!address || !message || !signature) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // ethers.verifyMessage akan mengembalikan alamat yang menandatangani pesan
    const signerAddress = ethers.verifyMessage(message, signature);

    // Bandingkan alamat hasil verifikasi dengan alamat yang dikirim
    if (signerAddress.toLowerCase() === address.toLowerCase()) {
      // Jika cocok, verifikasi berhasil
      res.status(200).json({ success: true, message: 'Signature verified.' });
    } else {
      // Jika tidak cocok, verifikasi gagal
      res.status(401).json({ success: false, message: 'Signature does not match the address.' });
    }
  } catch (error) {
    // Tangani jika signature tidak valid
    console.error("Signature verification error:", error);
    res.status(500).json({ success: false, message: 'Invalid signature or server error.' });
  }
}