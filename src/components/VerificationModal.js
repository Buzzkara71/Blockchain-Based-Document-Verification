import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Copy } from 'lucide-react';

Modal.setAppElement('#__next');

export default function VerificationModal({ isOpen, onRequestClose, result }) {
  if (!result) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} disalin ke clipboard!`);
  };
  
  // --- LOGIKA DIPERBAIKI ---
  // Kita periksa statusnya secara eksplisit agar lebih jelas dan aman
  const isSuccess = result.status === 'Terverifikasi';

  // Styling untuk modal dengan tema gelap & glassmorphism
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '500px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      padding: '0', // Padding kita kontrol manual di dalam JSX
      overflow: 'hidden',
      background: 'rgba(30, 41, 59, 0.8)', // slate-800 dengan transparansi
      backdropFilter: 'blur(10px)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Verification Result Modal">
      {/* Padding p-6 sekarang ada di sini */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            {isSuccess ? (
              <CheckCircle className="w-10 h-10 text-green-400" />
            ) : (
              <XCircle className="w-10 h-10 text-red-400" />
            )}
            <div>
              <h2 className="text-xl font-bold text-white">
                {isSuccess ? 'Dokumen Terverifikasi' : 'Verifikasi Gagal'}
              </h2>
              <p className="text-sm text-slate-400">
                {isSuccess ? 'Integritas dokumen ini telah dikonfirmasi.' : 'Silakan periksa detail di bawah.'}
              </p>
            </div>
          </div>
          <button onClick={onRequestClose} className="text-2xl text-slate-400 hover:text-white">&times;</button>
        </div>
        
        {/* --- LOGIKA TAMPILAN DIPERBAIKI --- */}
        <div className="space-y-3 text-sm mt-6 pt-4 border-t border-slate-700">
          {isSuccess ? (
            // Tampilan jika verifikasi SUKSES
            <>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Pengunggah Dokumen</p>
                <p className="font-semibold text-white">{result.uploader.name}</p>
                <p className="text-slate-300 break-all">{result.uploader.email}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Tanggal Registrasi</p>
                <p className="font-semibold text-white">{result.registrationDate}</p>
              </div>
              <div className="bg-slate-900/50 text-white font-mono text-xs p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="break-all" title={result.fileHash}>
                    <span className="text-slate-400">Doc Hash:</span> {result.fileHash}
                  </p>
                  <button onClick={() => handleCopy(result.fileHash, 'Hash Dokumen')} className="p-1 rounded text-slate-400 hover:bg-slate-700 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Tampilan jika verifikasi GAGAL
            <div className="bg-red-900/20 text-red-200 p-4 rounded-lg border border-red-700">
              <p className="font-semibold">Detail Kegagalan:</p>
              <p className="mt-1">{result.message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-900/50 px-6 py-3 text-right border-t border-slate-700">
        <button onClick={onRequestClose} className="px-5 py-2 bg-slate-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-700">
          Tutup
        </button>
      </div>
    </Modal>
  );
}