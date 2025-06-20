import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';

export default function AuditPage() {
  const [log, setLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/documents/public-log')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLog(data);
      })
      .catch(error => console.error("Failed to fetch public log:", error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <BookMarked className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-slate-800">Log Audit Publik</h1>
          <p className="mt-4 text-lg text-slate-600">Jejak audit on-chain dari 50 dokumen terakhir yang terdaftar di sistem ini.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          {isLoading ? (
            <p className="text-center py-10 animate-pulse">Memuat log publik...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat Pendaftar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bukti Transaksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {log.map(item => (
                    <tr key={item.transactionHash || item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.timestamp).toLocaleString('id-ID')}</td>
                      
                      {/* --- PERBAIKAN DI SINI --- */}
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono" title={item.uploaderAddress ?? 'Alamat tidak tersedia'}>
                        {`${item.uploaderAddress?.substring(0, 10) ?? 'N/A'}...`}
                      </td>
                      
                      {/* --- PERBAIKAN DI SINI --- */}
                      <td className="px-6 py-4 text-sm text-blue-600 font-mono">
                        <a 
                          href={item.transactionHash ? `https://sepolia.etherscan.io/tx/${item.transactionHash}` : '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline"
                        >
                          {`${item.transactionHash?.substring(0, 10) ?? 'N/A'}...`}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
            <Link href="/" className="text-blue-600 hover:underline">
                &larr; Kembali ke Halaman Utama
            </Link>
        </div>
      </div>
    </div>
  );
}