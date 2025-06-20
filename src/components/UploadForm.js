import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWallet } from '../lib/WalletContext'; // <-- Impor hook untuk mengakses context
import { getFileHash } from '../lib/hashing'; 
import { getConnectedContract } from '../lib/ethers-helper';
import { Upload } from 'lucide-react';

export default function UploadForm() {
  // Mengambil status terbaru dari WalletContext
  const { walletAddress, isWalletVerified } = useWallet(); 
  
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- LOGIKA PENGECEKAN YANG DIPERBAIKI ---
    if (!file) {
      return toast.error('Silakan pilih file terlebih dahulu.');
    }
    // Pengecekan ini sekarang menggunakan state 'isWalletVerified' dari context
    if (!isWalletVerified) {
      // Pesan error ini yang Anda lihat
      return toast.error('Silakan verifikasi dompet Anda terlebih dahulu di navbar.');
    }
    // -----------------------------------------

    setIsLoading(true);
    const toastId = toast.loading('1/3: Menghitung hash dokumen...');

    try {
      const fileHash = await getFileHash(file);
      toast.loading('2/3: Menunggu konfirmasi transaksi di MetaMask...', { id: toastId });

      const contract = await getConnectedContract();
      const tx = await contract.addDocument(fileHash);
      
      await tx.wait(); 
      toast.loading('3/3: Menyimpan metadata dokumen...', { id: toastId });

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
      
      toast.success('Registrasi dokumen selesai!', { id: toastId, duration: 5000 });
      setFile(null);
      // Reset input file di DOM secara manual
      if (e.target) e.target.reset();
      
    } catch (error) {
      console.error("Upload Gagal:", error);
      toast.error(`Error: ${error.reason || error.message || "Proses dibatalkan."}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="file-upload" className="w-full cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors">
        <Upload className="w-10 h-10 text-slate-400" />
        <span className="mt-2 text-sm font-semibold text-cyan-400">Pilih file untuk diregistrasi</span>
        <span className="text-xs text-slate-400 mt-1">{file ? file.name : 'atau seret dan lepas di sini'}</span>
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
      
      <button 
        type="submit" 
        disabled={isLoading || !file} 
        className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
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