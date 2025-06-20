import Modal from 'react-modal';
import { signIn } from 'next-auth/react';
import { ShieldCheck } from 'lucide-react';

// Atur elemen utama aplikasi untuk aksesibilitas modal
Modal.setAppElement('#__next');

// SVG untuk ikon Google
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.483-11.082-8.192l-6.854,5.337C9.06,41.125,15.93,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.666,44,31.134,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export default function LoginModal({ isOpen, onRequestClose }) {
  // Styling untuk modal, disesuaikan dengan tema gelap
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '400px',
      borderRadius: '12px',
      border: '1px solid #334155', // slate-700
      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
      padding: '2rem',
      backgroundColor: '#1e293b', // slate-800
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <div className="text-center">
        <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Selamat Datang</h2>
        <p className="mt-2 text-sm text-slate-400">
          Silakan masuk untuk mendaftarkan dokumen dan melihat riwayat Anda.
        </p>

        <div className="my-6 border-t border-slate-700"></div>

        <button 
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
        >
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        <p className="mt-6 text-xs text-slate-500">
          Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
        </p>
      </div>
    </Modal>
  );
}