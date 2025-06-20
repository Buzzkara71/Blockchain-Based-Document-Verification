import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const WalletContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }) {
  const { data: session, status } = useSession();
  const [walletAddress, setWalletAddress] = useState(null);
  const [isWalletVerified, setIsWalletVerified] = useState(false);

  const resetWallet = useCallback(() => {
    setWalletAddress(null);
    setIsWalletVerified(false);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated') {
      resetWallet();
    }
  }, [status, resetWallet]);

  // FUNGSI 1: HANYA UNTUK MENGHUBUNGKAN & MENAUTKAN KE DB
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') return toast.error('MetaMask tidak terinstal!');
    
    const toastId = toast.loading('Menunggu koneksi di MetaMask...');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      if (!address) throw new Error("Gagal mendapatkan alamat dompet.");

      toast.loading('Menautkan dompet ke profil Anda...', { id: toastId });
      const response = await fetch('/api/user/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ethAddress: address }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menautkan dompet.');
      
      setWalletAddress(address);
      toast.success('Dompet berhasil terhubung! Silakan verifikasi.', { id: toastId });
    } catch (error) {
      console.error("Koneksi dompet gagal:", error);
      toast.error(`Error: ${error.message}`, { id: toastId });
      resetWallet();
    }
  };
  
  // FUNGSI 2: HANYA UNTUK VERIFIKASI TANDA TANGAN
  const verifySignature = async () => {
    if (!walletAddress) return toast.error("Hubungkan dompet terlebih dahulu.");
    
    const toastId = toast.loading("Buka MetaMask untuk menandatangani pesan...");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const message = `Verifikasi kepemilikan untuk alamat: ${walletAddress}`;
      const signature = await signer.signMessage(message);
      
      const response = await fetch('/api/auth/verify-signature', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: walletAddress, message, signature }),
      });
      
      if (!response.ok) throw new Error((await response.json()).message || "Verifikasi tanda tangan gagal.");
      
      toast.success("Dompet berhasil diverifikasi!", { id: toastId });
      setIsWalletVerified(true);
    } catch (error) {
      console.error("Verifikasi gagal:", error);
      toast.error(`Verifikasi gagal: ${error.message}`, { id: toastId });
      setIsWalletVerified(false);
    }
  };

  const value = { walletAddress, isWalletVerified, connectWallet, verifySignature, resetWallet };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}