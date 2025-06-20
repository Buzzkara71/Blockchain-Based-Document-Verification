import { useSession } from 'next-auth/react';
import { useWallet } from '../lib/WalletContext';
import UploadForm from '../components/UploadForm';
import VerifyForm from '../components/VerifyForm';
import History from '../components/History';
import { ShieldCheck, UploadCloud, Lock } from 'lucide-react';

const LockedFeature = ({ session }) => {
  const message = !session ? 'Silakan login dengan Google untuk melanjutkan.' : 'Silakan hubungkan dompet MetaMask Anda di navbar untuk mendaftar.';

  return (
    <div className="text-center bg-slate-800/50 border-2 border-dashed border-slate-700 p-8 rounded-lg py-12 px-6 flex flex-col justify-center items-center">
      <Lock className="w-12 h-12 mx-auto text-slate-400 mb-4" />
      <p className="font-semibold text-white">Fitur Registrasi Terkunci</p>
      <p className="text-sm text-slate-400 mt-2">{message}</p>
    </div>
  );
};

export default function VerifyPage() {
  const { data: session } = useSession();
  const { walletAddress } = useWallet();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Verifikasi Dokumen</h2>
            </div>
            <p className="text-sm text-slate-300 mb-6">Unggah dokumen untuk memeriksa keasliannya.</p>
            <VerifyForm />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <UploadCloud className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Registrasi Dokumen</h2>
            </div>
            {session && walletAddress ? (
              <>
                <p className="text-sm text-slate-300 mb-6">Pilih dokumen untuk dicatat di blockchain.</p>
                <UploadForm />
              </>
            ) : (
              <LockedFeature session={session} />
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          {session && <History />}
        </div>
      </div>
    </div>
  );
}