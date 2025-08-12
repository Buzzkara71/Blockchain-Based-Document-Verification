import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { getFileHash } from '../lib/hashing';
import { getReadOnlyContract } from '../lib/ethers-helper';
import VerificationModal from './VerificationModal';
import { CheckCircle, Hash } from 'lucide-react';

export default function VerifyForm() {
  const [file, setFile] = useState(null);
  const [hashInput, setHashInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Hanya file dengan format .PDF yang diizinkan.");
        setFile(null);
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
      setHashInput("");
    }
  };

  const handleHashInputChange = (e) => {
    setHashInput(e.target.value);
    if (file) {
      setFile(null);
      document.getElementById('file-verify').value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !hashInput) {
      return toast.error('Silakan unggah file .PDF ATAU masukkan hash dokumen.');
    }
    
    setIsLoading(true);
    setVerificationResult(null);
    const toastId = toast.loading('Mempersiapkan verifikasi...');

    let hashToVerify = '';

    try {
      if (hashInput) {
        if (!/^0x[a-fA-F0-9]{64}$/.test(hashInput)) {
          throw new Error('Format hash tidak valid. Harus diawali 0x dan 64 karakter.');
        }
        hashToVerify = hashInput;
        toast.loading('Mencari hash di Blockchain...', { id: toastId });
      } else {
        toast.loading('Menghitung hash dokumen...', { id: toastId });
        hashToVerify = await getFileHash(file);
        toast.loading('Mencari hash di Blockchain...', { id: toastId });
      }
      
      const contract = getReadOnlyContract();
      const [uploaderAddress, timestamp] = await contract.verifyDocument(hashToVerify);
      
      toast.dismiss(toastId);

      if (uploaderAddress === ethers.ZeroAddress) {
        setVerificationResult({
          status: 'Gagal',
          message: 'Sidik jari digital (hash) dari dokumen ini tidak ditemukan di dalam catatan blockchain kami. Dokumen ini belum terdaftar atau isinya telah diubah.'
        });
        setModalIsOpen(true);
        return;
      }

      toast.loading('Mengambil data pendaftar...', { id: toastId });
      const registrationDate = new Date(Number(timestamp) * 1000).toLocaleString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      
      const response = await fetch(`/api/user/${uploaderAddress}`);
      let uploaderData;

      if (response.status === 404) {
        toast.success('Dokumen Terverifikasi (Pendaftar Anonim)!', { id: toastId });
        uploaderData = { 
          name: 'Identitas Tidak Ditemukan', 
          email: uploaderAddress
        };
      } else if (response.ok) {
        toast.success('Dokumen Berhasil Diverifikasi!', { id: toastId });
        uploaderData = await response.json();
      } else {
        throw new Error('Gagal mengambil data pendaftar dari server.');
      }
      
      setVerificationResult({
        status: 'Terverifikasi',
        uploader: uploaderData,
        registrationDate: registrationDate,
        fileHash: hashToVerify,
      });
      setModalIsOpen(true);

    } catch (error) {
      console.error("Verification Error:", error);
      toast.dismiss(toastId);
      toast.error(error.message || 'Terjadi kesalahan tak terduga.');
      setVerificationResult({ status: 'Error', message: error.message || 'Terjadi kesalahan tak terduga.' });
      setModalIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="file-verify" className="w-full cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-10 h-10 text-slate-400" />
            <span className="mt-2 text-sm font-semibold text-cyan-400">Pilih file .PDF untuk verifikasi</span>
            <span className="text-xs text-slate-400 mt-1">{file ? file.name : 'atau seret dan lepas di sini'}</span>
        </label>
        <input 
          id="file-verify" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange} 
          accept="application/pdf"
        />
        
        <div className="flex items-center">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm">ATAU</span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <div>
          <label htmlFor="hash-input" className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4" />
            <span>Masukkan Hash Dokumen</span>
          </label>
          <input 
            id="hash-input"
            type="text"
            value={hashInput}
            onChange={handleHashInputChange}
            placeholder="0x..."
            className="w-full bg-slate-900/70 border border-slate-600 rounded-lg p-3 text-sm font-mono text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading || (!file && !hashInput)} 
          className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Memverifikasi...
            </>
          ) : 'Verifikasi'}
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