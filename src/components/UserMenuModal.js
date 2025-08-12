import Modal from 'react-modal';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useWallet } from '../lib/WalletContext';
import LogoutButton from './layout/LogoutButton';
import toast from 'react-hot-toast';
import { ShieldCheck, Link as LinkIcon, AlertTriangle, Unplug } from 'lucide-react';

Modal.setAppElement('#__next');

export default function UserMenuModal({ isOpen, onRequestClose }) {
  const { data: session } = useSession();
  const { walletAddress, isWalletVerified, connectWallet, verifySignature, resetWallet } = useWallet();

  if (!isOpen || !session) return null;

  const handleDisconnect = () => {
    resetWallet();
    onRequestClose(); // Tutup modal setelah disconnect
    toast.success("Koneksi dompet telah diputus.");
  };
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '420px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0',
      overflow: 'hidden',
      background: 'rgba(30, 41, 59, 0.85)',
      backdropFilter: 'blur(10px)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="User Menu Modal">
      <div className="p-6">
        <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
          <Image src={session.user.image} alt="User Avatar" width={48} height={48} className="rounded-full" />
          <div>
            <p className="font-semibold text-lg text-white truncate">{session.user.name}</p>
            <p className="text-sm text-slate-400 truncate">{session.user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-slate-300">Status Dompet</p>
          <div className="space-y-3">
            {!walletAddress ? (
              <button onClick={connectWallet} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <LinkIcon className="w-5 h-5" /> Hubungkan Dompet MetaMask
              </button>
            ) : !isWalletVerified ? (
              <>
                <div className="px-4 py-2 text-sm bg-yellow-900/50 text-yellow-300 rounded-lg font-mono border border-yellow-700 flex items-center justify-center gap-3" title={walletAddress}>
                  <AlertTriangle className="w-5 h-5" />
                  <span>Belum Terverifikasi</span>
                </div>
                <button onClick={verifySignature} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 animate-pulse">
                  <ShieldCheck className="w-5 h-5" /> Verifikasi Kepemilikan Dompet
                </button>
                <button onClick={handleDisconnect} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-700">
                  <Unplug className="w-5 h-5" /> Putuskan Koneksi
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-3 text-sm bg-green-900/50 text-green-300 rounded-lg font-mono border border-green-700 flex items-center justify-center gap-3" title={walletAddress}>
                  <ShieldCheck className="w-5 h-5" />
                  <span>{`${walletAddress.substring(0, 8)}...${walletAddress.substring(36)}`}</span>
                </div>
                <button onClick={handleDisconnect} className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-700">
                  <Unplug className="w-5 h-5" /> Putuskan Koneksi
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700 flex justify-between items-center">
        <LogoutButton />
      </div>
    </Modal>
  );
}