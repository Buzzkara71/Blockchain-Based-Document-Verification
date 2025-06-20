import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useWallet } from '../../lib/WalletContext';
import { ShieldCheck, LogIn, Link as LinkIcon, AlertTriangle, ChevronDown } from 'lucide-react';
import LoginModal from '../LoginModal';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { walletAddress, isWalletVerified, connectWallet, verifySignature } = useWallet();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const UserMenu = () => (
    <div className="relative group">
      <div className="flex items-center gap-2 cursor-pointer p-1">
        <Image src={session.user.image} alt="User Avatar" width={36} height={36} className="rounded-full border-2 border-slate-600 group-hover:border-cyan-400"/>
        <ChevronDown className="w-4 h-4 text-slate-300 group-hover:rotate-180 transition-transform" />
      </div>
      <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="px-3 py-2 border-b border-slate-700">
          <p className="font-semibold text-sm text-slate-100">{session.user.name}</p>
          <p className="text-xs text-slate-400">{session.user.email}</p>
        </div>
        <div className="p-1 mt-1">
          <p className="px-2 pt-1 pb-2 text-xs font-semibold text-slate-500 uppercase">Aksi Dompet</p>
          {!walletAddress ? (
            <button onClick={connectWallet} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 rounded-md hover:bg-slate-700">
              <LinkIcon className="w-4 h-4" /> Hubungkan Dompet
            </button>
          ) : !isWalletVerified ? (
            <button onClick={verifySignature} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-yellow-300 rounded-md hover:bg-slate-700 animate-pulse">
              <AlertTriangle className="w-4 h-4" /> Verifikasi Dompet
            </button>
          ) : (
            <div className="px-3 py-2 text-sm text-green-300 rounded-md font-mono flex items-center gap-2" title={walletAddress}>
              <ShieldCheck className="w-4 h-4" />
              <span>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}</span>
            </div>
          )}
        </div>
        <div className="border-t border-slate-700 mt-1 p-1"><LogoutButton /></div>
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-slate-900/50 shadow-md sticky top-0 z-50 backdrop-blur-lg border-b border-slate-700/50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white"><ShieldCheck className="w-7 h-7 text-cyan-400" /><span>DocuChain</span></Link>
            <div className="hidden md:flex items-center gap-6 border-l border-slate-700 pl-6"><Link href="/audit" className="text-sm font-medium text-slate-300 hover:text-white">Log Audit</Link></div>
          </div>
          <div className="flex items-center">
            {status === 'loading' ? (<div className="text-sm text-slate-400">Loading...</div>)
            : session ? (<UserMenu />) 
            : (<button onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-slate-100 text-slate-800 rounded-lg hover:bg-white"><LogIn className="w-4 h-4" /> Sign In</button>)}
          </div>
        </nav>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}