import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useWallet } from '../lib/WalletContext';
import UploadForm from '../components/UploadForm';
import VerifyForm from '../components/VerifyForm';
import History from '../components/History';
import TutorialModal from '../components/TutorialModal';
import { ShieldCheck, UploadCloud, Lock, HelpCircle, AlertCircle } from 'lucide-react';

const LockedFeature = ({ session, walletAddress, isWalletVerified }) => {
  let message = '';
  let steps = [];
  
  if (!session) {
    message = 'Untuk mendaftarkan dokumen, Anda perlu masuk terlebih dahulu.';
    steps = ['Klik tombol "Masuk" di navigation bar', 'Login menggunakan akun Google Anda'];
  } else if (!walletAddress) {
    message = 'Hubungkan dompet MetaMask untuk melanjutkan registrasi dokumen.';
    steps = ['Klik avatar Anda di navigation bar', 'Pilih "Hubungkan Wallet"', 'Ikuti petunjuk untuk menghubungkan MetaMask'];
  } else if (!isWalletVerified) {
    message = 'Verifikasi kepemilikan dompet Anda untuk keamanan.';
    steps = ['Klik avatar Anda di navigation bar', 'Pilih "Verifikasi Wallet"', 'Tanda tangani pesan verifikasi'];
  }

  return (
    <div className="academic-card p-8 h-full flex flex-col justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center h-16 w-16 bg-slate-700/50 rounded-full mb-6 mx-auto">
          <Lock className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-4">Fitur Registrasi Terkunci</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">{message}</p>
        
        {steps.length > 0 && (
          <div className="text-left">
            <p className="text-sm font-medium text-slate-300 mb-3">Langkah-langkah:</p>
            <ol className="text-sm text-slate-400 space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-cyan-400/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default function VerifyPage() {
  const { data: session } = useSession();
  const { walletAddress, isWalletVerified } = useWallet();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              Verifikasi & Registrasi Dokumen
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Verifikasi keaslian dokumen yang sudah terdaftar atau daftarkan dokumen baru ke blockchain.
            </p>
            <button 
              onClick={() => setIsTutorialOpen(true)}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Butuh bantuan? Lihat tutorial
            </button>
          </div>

          {/* Main Content - Responsive Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              
              {/* Verification Section */}
              <div className="academic-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan-400/20 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Verifikasi Dokumen</h2>
                    <p className="text-sm text-slate-400">Periksa keaslian dokumen yang sudah terdaftar</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-300 font-medium">Akses Publik</p>
                      <p className="text-xs text-blue-200/80 mt-1">
                        Fitur ini dapat digunakan oleh siapa saja tanpa perlu login.
                      </p>
                    </div>
                  </div>
                </div>
                
                <VerifyForm />
              </div>

              {/* Registration Section */}
              <div className="academic-card p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-400/20 rounded-lg">
                    <UploadCloud className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Registrasi Dokumen</h2>
                    <p className="text-sm text-slate-400">Daftarkan dokumen baru ke blockchain</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start gap-3 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-300 font-medium">Perlu Autentikasi</p>
                      <p className="text-xs text-amber-200/80 mt-1">
                        Login, hubungkan wallet, dan verifikasi diperlukan untuk registrasi.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  {session && walletAddress && isWalletVerified ? (
                    <UploadForm />
                  ) : (
                    <LockedFeature 
                      session={session} 
                      walletAddress={walletAddress} 
                      isWalletVerified={isWalletVerified} 
                    />
                  )}
                </div>
              </div>
            </div>

            {/* History Section - Only show if user is logged in */}
            {session && (
              <div className="academic-card p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Riwayat Aktivitas Anda</h2>
                <History />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TutorialModal isOpen={isTutorialOpen} onRequestClose={() => setIsTutorialOpen(false)} />
    </>
  );
}