import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWallet } from '../lib/WalletContext';
import { getFileHash } from '../lib/hashing';
import { getConnectedContract } from '../lib/ethers-helper';
import { Upload } from 'lucide-react';

export default function UploadForm() {
  const { walletAddress, isWalletVerified } = useWallet();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validasi untuk memastikan hanya file PDF yang diterima
      if (selectedFile.type !== "application/pdf") {
        toast.error("Hanya file dengan format .PDF yang diizinkan.");
        setFile(null);
        e.target.value = null; // Reset nilai input file di DOM
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Silakan pilih file .PDF untuk diregistrasi.');
    if (!walletAddress || !isWalletVerified) return toast.error('Dompet tidak terhubung atau belum diverifikasi.');

    setIsLoading(true);
    const toastId = toast.loading('Mempersiapkan registrasi...');

    try {
      toast.loading('1/3: Menghitung hash dokumen...', { id: toastId });
      const fileHash = await getFileHash(file);
      
      toast.loading('2/3: Menghubungkan ke smart contract...', { id: toastId });
      const contract = await getConnectedContract();
      
      toast.loading('3/3: Mengirim transaksi ke MetaMask...', { id: toastId });
      
      // --- PERBAIKAN UTAMA ADA DI BARIS INI ---
      // Nama fungsi yang benar adalah 'addDocument' dan hanya menerima 1 argumen (hash)
      const tx = await contract.addDocument(fileHash);
      
      toast.loading('Menunggu konfirmasi dari jaringan blockchain...', { id: toastId });
      await tx.wait();

      // Memanggil API backend untuk menyimpan metadata setelah transaksi on-chain berhasil
      const response = await fetch('/api/documents/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileHash: fileHash,
          transactionHash: tx.hash,
          uploaderAddress: walletAddress,
        })
      });

      if (!response.ok) {
        throw new Error((await response.json()).message || 'Gagal menyimpan metadata.');
      }

      toast.success('Dokumen berhasil diregistrasi!', { id: toastId, duration: 5000 });
      setFile(null);
      // Reset input file di DOM secara manual agar bisa memilih file yang sama lagi
      if (e.target) e.target.reset();

    } catch (error) {
      console.error("Registrasi Gagal:", error);
      // 'error.reason' sering memberikan pesan error yang lebih jelas dari smart contract
      const errorMessage = error.reason || (error.message.includes("user rejected transaction")
        ? "Transaksi dibatalkan oleh pengguna."
        : error.message);
      toast.error(`Registrasi Gagal: ${errorMessage}`, { id: toastId, duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="file-upload" className="w-full cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors">
        <Upload className="w-10 h-10 text-slate-400" />
        <span className="mt-2 text-sm font-semibold text-cyan-400">Pilih file .PDF untuk diregistrasi</span>
        <span className="text-xs text-slate-400 mt-1">{file ? file.name : 'atau seret dan lepas di sini'}</span>
      </label>
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        onChange={handleFileChange}
        accept="application/pdf"
      />
      
      <button 
        type="submit" 
        disabled={isLoading || !file} 
        className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Memproses...
          </>
        ) : 'Registrasi Dokumen'}
      </button>
    </form>
  );
}