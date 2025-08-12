import Modal from 'react-modal';
// Impor ikon dari lucide-react
import { HelpCircle, Upload, Search, FileText, UserCheck, Fingerprint, Award, LogIn } from 'lucide-react';

Modal.setAppElement('#__next');

export default function TutorialModal({ isOpen, onRequestClose }) {
  // Styling untuk modal (tidak ada perubahan)
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '650px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0',
      overflow: 'auto', // Ganti menjadi auto agar bisa di-scroll jika konten panjang
      maxHeight: '90vh', // Batasi tinggi modal
      background: 'rgba(30, 41, 59, 0.85)',
      backdropFilter: 'blur(10px)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  };

  const StepCard = ({ icon, title, description }) => (
    <div className="text-center p-4">
      <div className="flex items-center justify-center h-16 w-16 mx-auto bg-slate-700/50 text-cyan-400 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Tutorial Modal">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Panduan Penggunaan</h2>
              <p className="text-sm text-slate-400">Cara mendaftar dan memverifikasi dokumen.</p>
            </div>
          </div>
          <button onClick={onRequestClose} className="text-2xl text-slate-400 hover:text-white">&times;</button>
        </div>

        {/* --- KONTEN TANPA TABS --- */}
        <div className="space-y-12">
          {/* Bagian Alur Verifikasi */}
          <div>
            <h3 className="text-2xl font-bold text-center text-white mb-8">Alur Verifikasi Dokumen</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <StepCard icon={<Upload className="w-8 h-8"/>} title="1. Pilih Dokumen" description="Unggah file yang ingin Anda periksa. Proses 100% aman di browser Anda." />
              <StepCard icon={<Search className="w-8 h-8"/>} title="2. Klik Verifikasi" description="Sistem akan menghitung hash unik dari file dan mencocokkannya dengan data di blockchain." />
              <StepCard icon={<FileText className="w-8 h-8"/>} title="3. Lihat Hasil" description="Dapatkan konfirmasi instan dalam pop-up mengenai keaslian dokumen dan detail pendaftarnya." />
            </div>
          </div>

          {/* Pemisah Visual */}
          <div className="border-t border-slate-700"></div>

          {/* Bagian Alur Registrasi */}
          <div>
            <h3 className="text-2xl font-bold text-center text-white mb-8">Alur Registrasi Dokumen</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <StepCard icon={<LogIn className="w-8 h-8"/>} title="1. Login & Hubungkan" description="Masuk dengan akun Google, lalu hubungkan & verifikasi dompet MetaMask Anda melalui menu di navbar." />
                <StepCard icon={<Fingerprint className="w-8 h-8"/>} title="2. Daftarkan Dokumen" description="Pilih dokumen yang akan didaftarkan, lalu setujui transaksi di MetaMask untuk mengirim hash-nya ke blockchain." />
                <StepCard icon={<Award className="w-8 h-8"/>} title="3. Bukti Tercatat" description="Setelah berhasil, dokumen Anda resmi memiliki bukti keaslian yang abadi dan dapat diverifikasi siapa saja." />
            </div>
          </div>
        </div>

      </div>
      <div className="bg-slate-900/50 px-6 py-4 text-right border-t border-slate-700 sticky bottom-0">
        <button onClick={onRequestClose} className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
          Mengerti
        </button>
      </div>
    </Modal>
  );
}