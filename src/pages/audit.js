import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookMarked, ArrowLeft } from 'lucide-react';

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
    // Div utama tidak perlu kelas background, agar mewarisi dari globals.css
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          {/* Ikon disesuaikan dengan tema gelap */}
          <BookMarked className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
          {/* Teks diubah menjadi warna terang */}
          <h1 className="text-4xl font-bold text-white">Log Audit Publik</h1>
          <p className="mt-4 text-lg text-slate-300">Jejak audit on-chain dari 50 dokumen terakhir yang terdaftar di sistem ini.</p>
        </div>

        {/* Kartu utama diubah menjadi 'glassmorphism' agar konsisten */}
        <div className="max-w-5xl mx-auto bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
          {isLoading ? (
            <p className="text-center py-10 text-slate-300 animate-pulse">Memuat log publik...</p>
          ) : log.length === 0 ? (
            <p className="text-center py-10 text-slate-400">Belum ada dokumen yang terdaftar di log publik.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                {/* Header tabel disesuaikan dengan tema gelap */}
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Alamat Pendaftar</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Bukti Transaksi</th>
                  </tr>
                </thead>
                {/* Body tabel disesuaikan */}
                <tbody className="divide-y divide-slate-800">
                  {log.map(item => (
                    <tr key={item.transactionHash || item._id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {new Date(item.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono" title={item.uploaderAddress ?? 'Alamat tidak tersedia'}>
                        {`${item.uploaderAddress?.substring(0, 10) ?? 'N/A'}...`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-400 font-mono">
                        <a 
                          href={item.transactionHash ? `https://sepolia.etherscan.io/tx/${item.transactionHash}` : '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline"
                          title="Lihat transaksi di Etherscan"
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
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors shadow-md">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Halaman Utama
            </Link>
        </div>
      </div>
    </div>
  );
}