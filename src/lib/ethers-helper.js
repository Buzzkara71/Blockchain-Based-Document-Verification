import { ethers } from 'ethers';
import { contractAddress, contractABI } from './contract-config';

// Variabel ini harus diekspos ke frontend, jadi namanya harus NEXT_PUBLIC_
const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;

// --- KONEKSI PUBLIK (READ-ONLY) ---
// Membuat satu instance provider publik yang bisa digunakan kembali.
// Tidak memerlukan MetaMask.
const publicProvider = new ethers.JsonRpcProvider(RPC_URL);
const readOnlyContract = new ethers.Contract(contractAddress, contractABI, publicProvider);

/**
 * Mengembalikan instance kontrak read-only yang sudah siap pakai.
 * @returns {ethers.Contract} - Instance kontrak read-only.
 */
export function getReadOnlyContract() {
  return readOnlyContract;
}


// --- KONEKSI PRIVAT (MEMERLUKAN TANDA TANGAN) ---
/**
 * Membuat dan mengembalikan instance kontrak yang terhubung dengan dompet pengguna.
 * Diperlukan untuk mengirim transaksi (menulis data).
 * @returns {Promise<ethers.Contract>} - Promise yang resolve dengan instance kontrak.
 */
export async function getConnectedContract() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please use a Web3-enabled browser.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}