import { ethers } from 'ethers';

/**
 * Mengambil objek File dari input browser, membacanya sebagai ArrayBuffer,
 * dan menghitung hash SHA-256-nya.
 * @param {File} file - Objek file yang dipilih oleh pengguna.
 * @returns {Promise<string>} - Promise yang akan resolve dengan hash format bytes32 (cth: "0x...").
 */
export async function getFileHash(file) {
  if (!file) {
    throw new Error("No file provided.");
  }

  // 1. Membaca file sebagai ArrayBuffer menggunakan FileReader
  const arrayBuffer = await file.arrayBuffer();

  // 2. Menggunakan ethers.js untuk menghitung hash Keccak256 (standar di Ethereum)
  // Solidity menggunakan keccak256, jadi kita gunakan ini agar cocok.
  const fileBytes = new Uint8Array(arrayBuffer);
  const fileHash = ethers.keccak256(fileBytes);
  
  return fileHash;
}