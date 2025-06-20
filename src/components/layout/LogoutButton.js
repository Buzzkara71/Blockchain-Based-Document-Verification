import { useWallet } from '../../lib/WalletContext';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  // Nama fungsinya adalah 'resetWallet', bukan 'resetWalletState'
  const { resetWallet } = useWallet();

  const handleSignOut = () => {
    resetWallet(); // Memanggil fungsi yang benar dari context
    signOut();
  };
  
  return (
    <button 
      onClick={handleSignOut} 
      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-slate-700 transition-colors"
    >
      <LogOut className="w-4 h-4" /> Sign Out
    </button>
  );
}