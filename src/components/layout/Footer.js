import Link from 'next/link';
import { BookOpenCheck, Github, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800/80 backdrop-blur-sm text-slate-300 border-t border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-xl font-bold text-white mb-4">
              <BookOpenCheck className="w-7 h-7 text-cyan-400" />
              <span>DocVerify</span>
            </Link>

          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/verify" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  Verifikasi Dokumen
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  Log Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">
              Infomarsi
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <span className="font-medium text-slate-300">Tujuan:</span> Penelitian Skripsi
              </li>
              <li>
                <span className="font-medium text-slate-300">Teknologi:</span> Blockchain Ethereum
              </li>
              <li>
                <span className="font-medium text-slate-300">Jaringan:</span> Sepolia Testnet
              </li>
              <li className="pt-2">
                <a 
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Dapatkan Sepolia ETH
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">Powered by:</span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Next.js</span>
                <span>•</span>
                <span>Ethereum</span>
                <span>•</span>
                <span>Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}