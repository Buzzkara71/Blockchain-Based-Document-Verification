import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { RotateCw } from 'lucide-react';
import HistoryDetailModal from './HistoryDetailModal';

export default function History() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (status !== 'authenticated') {
      setIsLoading(false);
      return;
    }
    if (history.length === 0) setIsLoading(true);

    try {
      const response = await fetch('/api/documents/history');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status, history.length]);

  useEffect(() => {
    fetchHistory();
    const intervalId = setInterval(() => fetchHistory(), 30000);
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
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Registrasi Anda</h2>
          <button onClick={fetchHistory} disabled={isLoading} className="p-2 text-gray-500 rounded-full hover:bg-gray-100" title="Refresh History">
            <RotateCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {isLoading && history.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Memuat riwayat...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Anda belum pernah mendaftarkan dokumen.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengunggah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detail</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map(doc => (
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 truncate max-w-xs">{doc.fileName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.uploaderName}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button onClick={() => handleViewDetails(doc)} className="text-blue-600 hover:text-blue-900">
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