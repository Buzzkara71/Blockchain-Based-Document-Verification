import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { WalletProvider } from '../lib/WalletContext';
import '../styles/globals.css';

// 1. Impor font Nunito dari next/font/google
import { Nunito_Sans } from 'next/font/google';

// 2. Inisialisasi font dengan subset 'latin'
const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // 3. Terapkan class font ke div utama dan atur layout flex vertikal
    <div className={`${nunitoSans.className} flex flex-col min-h-screen`}>
      <SessionProvider session={session}>
      <WalletProvider>
          <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </WalletProvider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;