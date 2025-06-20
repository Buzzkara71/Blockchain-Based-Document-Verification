import Link from 'next/link';
import { ShieldCheck, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-2">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
              <span>DocuChain</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md">
              Sebuah sistem verifikasi dokumen digital yang aman, transparan, dan terdesentralisasi menggunakan kekuatan teknologi Blockchain.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Verifikasi</Link></li>
              <li><Link href="/audit" className="text-sm hover:text-white transition-colors">Log Audit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Ikuti Kami</h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} DocuChain Verify. Dibuat untuk Tujuan Proyek Akhir.</p>
        </div>
      </div>
    </footer>
  );
}