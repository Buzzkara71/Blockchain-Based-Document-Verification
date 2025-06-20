import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { getFileHash } from '../lib/hashing';
import { getReadOnlyContract } from '../lib/ethers-helper'; // Menggunakan koneksi publik
import VerificationModal from './VerificationModal';
import { CheckCircle } from 'lucide-react';

export default function VerifyForm() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Silakan pilih file untuk diverifikasi.');
      return;
    }
    
    setIsLoading(true);
    setVerificationResult(null); // Reset hasil setiap kali verifikasi baru
    const toastId = toast.loading('1/3: Menghitung hash dokumen...');

    try {
      const fileHash = await getFileHash(file);
      console.log("HASH SAAT VERIFIKASI:", fileHash);
      
      toast.loading('2/3: Mencari hash di Blockchain...', { id: toastId });
      const contract = getReadOnlyContract();
      const [uploaderAddress, timestamp] = await contract.verifyDocument(fileHash);

      // ---- LOGIKA INTI YANG DIPERBAIKI ----

      // KONDISI A: HASH TIDAK DITEMUKAN DI BLOCKCHAIN
      if (uploaderAddress === ethers.ZeroAddress) {
        toast.error('Verifikasi Gagal: Dokumen ini tidak terdaftar atau isinya telah diubah.', { id: toastId, duration: 5000 });
        setVerificationResult({
          status: 'Gagal',
          message: 'Sidik jari digital (hash) dari dokumen ini tidak ditemukan di dalam catatan blockchain kami.'
        });
        setModalIsOpen(true); // Tetap buka modal untuk menampilkan pesan gagal
        return; // Hentikan proses di sini
      }

      // KONDISI B: HASH DITEMUKAN, LANJUTKAN MENCARI DATA PENGGUNGGAH
      toast.loading('3/3: Mengambil data pengunggah...', { id: toastId });
      const registrationDate = new Date(Number(timestamp) * 1000).toLocaleString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      
      const response = await fetch(`/api/user/${uploaderAddress}`);
      let uploaderData;

      if (response.status === 404) {
        // Jika data pengguna tidak ditemukan di DB kita, ini adalah 'Uploader Anonim'
        toast.success('Dokumen Terverifikasi (Pendaftar Anonim)!', { id: toastId });
        uploaderData = { 
          name: 'Identitas Tidak Ditemukan', 
          email: uploaderAddress // Tampilkan alamat dompet sebagai fallback
        };
      } else if (response.ok) {
        // Jika data pengguna ditemukan
        toast.success('Dokumen Berhasil Diverifikasi!', { id: toastId });
        uploaderData = await response.json();
      } else {
        // Jika terjadi error server lain
        throw new Error('Gagal mengambil data pendaftar dari server.');
      }
      
      // Siapkan hasil akhir dan buka modal sukses
      setVerificationResult({
        status: 'Terverifikasi',
        uploader: uploaderData,
        registrationDate: registrationDate,
        fileHash: fileHash,
      });
      setModalIsOpen(true);

    } catch (error) {
      console.error("Verification Error:", error);
      toast.dismiss(toastId); // Hapus toast loading
      toast.error(error.message || 'Terjadi kesalahan tak terduga.');
      setVerificationResult({ status: 'Error', message: error.message });
      setModalIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="file-verify" className="w-full cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors">
            <CheckCircle className="w-10 h-10 text-slate-400" />
            <span className="mt-2 text-sm font-semibold text-cyan-400">Pilih file untuk verifikasi</span>
            <span className="text-xs text-slate-400 mt-1">{file ? file.name : 'atau seret dan lepas di sini'}</span>
        </label>
        <input id="file-verify" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        
        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all">
          {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
        </button>
      </form>
      <VerificationModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        result={verificationResult}
      />
    </div>
  );
}