import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { RotateCw, History as HistoryIcon } from 'lucide-react'; // Ganti nama impor agar tidak konflik
import HistoryDetailModal from './HistoryDetailModal';

export default function History() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk modal, tidak ada perubahan logika
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Logika untuk fetch data (tidak ada perubahan)
  const fetchHistory = useCallback(async () => {
    if (status !== 'authenticated') {
      setIsLoading(false);
      return;
    }
    // Tampilkan loading hanya saat data benar-benar kosong
    if (history.length === 0) setIsLoading(true);

    try {
      const response = await fetch('/api/documents/history');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) setHistory(data);
      } else {
        console.error("Failed to fetch history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status, history.length]);

  useEffect(() => {
    fetchHistory();
    const intervalId = setInterval(() => {
      // Refresh di latar belakang tanpa menampilkan loading spinner
      fetchHistory();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [fetchHistory]);

  const handleViewDetails = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoc(null);
  };

  if (status !== 'authenticated') return null;

  return (
    <>
      {/* --- KODE JSX DENGAN STYLING BARU --- */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 mt-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <HistoryIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Riwayat Registrasi Anda</h2>
          </div>
          <button 
            onClick={fetchHistory} 
            disabled={isLoading}
            className="p-2 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-wait transition-colors" 
            title="Refresh History"
          >
            <RotateCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {isLoading && history.length === 0 ? (
          <p className="text-slate-400 animate-pulse text-center py-10">Memuat riwayat...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
              <p className="text-slate-400">Anda belum pernah mendaftarkan dokumen.</p>
              <p className="text-sm text-slate-500 mt-2">Coba daftarkan dokumen untuk melihat riwayatnya di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama File</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Pengunggah</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800/50 divide-y divide-slate-800">
                {history.map(doc => (
                  <tr key={doc._id} className="hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200 truncate max-w-xs" title={doc.fileName}>
                      {doc.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {doc.uploaderName}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(doc.timestamp).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewDetails(doc)} 
                        className="text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <HistoryDetailModal isOpen={isModalOpen} onRequestClose={handleCloseModal} doc={selectedDoc} />
    </>
  );
}