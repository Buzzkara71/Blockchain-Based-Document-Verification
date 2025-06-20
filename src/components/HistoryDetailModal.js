import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { Copy, ExternalLink } from 'lucide-react';

Modal.setAppElement('#__next');

export default function HistoryDetailModal({ isOpen, onRequestClose, doc }) {
  if (!doc) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} disalin ke clipboard!`);
  };
  
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
      maxWidth: '600px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      padding: '0',
      overflow: 'hidden',
      background: 'rgba(30, 41, 59, 0.8)', // slate-800 dengan transparansi
      backdropFilter: 'blur(10px)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Document Detail Modal">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Detail Registrasi Dokumen</h2>
          <button onClick={onRequestClose} className="text-2xl text-slate-400 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4 text-sm">
          {/* Bagian Informasi Dasar */}
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <div>
              <p className="text-slate-400 text-xs">Nama File</p>
              <p className="font-semibold text-white break-words">{doc.fileName}</p>
            </div>
            <div className="mt-3">
              <p className="text-slate-400 text-xs">Pengunggah</p>
              <p className="font-semibold text-white">{doc.uploaderName} ({doc.uploaderEmail})</p>
            </div>
            <div className="mt-3">
              <p className="text-slate-400 text-xs">Tanggal Registrasi</p>
              <p className="font-semibold text-white">
                {new Date(doc.timestamp).toLocaleString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          {/* Bagian Informasi Blockchain */}
          <div>
            <h3 className="font-semibold text-slate-300 mb-2">Detail Blockchain</h3>
            <div className="space-y-3 font-mono text-xs bg-slate-900 text-white p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center gap-2">
                <p className="truncate" title={doc.fileHash}>
                  <span className="text-slate-400">Doc Hash:</span> {doc.fileHash}
                </p>
                <button onClick={() => handleCopy(doc.fileHash, 'Hash Dokumen')} className="p-1 rounded text-slate-400 hover:bg-slate-700 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center gap-2">
                <a href={`https://sepolia.etherscan.io/tx/${doc.transactionHash}`} target="_blank" rel="noopener noreferrer" className="truncate text-cyan-400 hover:underline" title={doc.transactionHash}>
                  <span className="text-slate-400">Tx Hash:</span> {doc.transactionHash}
                </a>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleCopy(doc.transactionHash, 'Transaction Hash')} className="p-1 rounded text-slate-400 hover:bg-slate-700 hover:text-white">
                        <Copy className="w-4 h-4" />
                    </button>
                    <a href={`https://sepolia.etherscan.io/tx/${doc.transactionHash}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded text-slate-400 hover:bg-slate-700 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
              </div>
            </div>
          </div>
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