import Link from 'next/link';
import { KeyRound, Globe, Lock, FileText, Search, Upload, Rocket, UserCheck, Fingerprint, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    // Kita tidak perlu div pembungkus dengan bg-white di sini,
    // agar gradient dari globals.css bisa menjadi latar belakang utama.
    <>
      {/* ===== Bagian Hero ===== */}
      <section className="relative text-white overflow-hidden">
        {/* Lapisan gradient gelap untuk efek visual yang dramatis */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-95"></div>
        {/* Konten Hero */}
        <div className="relative container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Keaslian Dokumen, <br /> Diamankan oleh <span className="text-cyan-400">Blockchain</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-lg text-slate-300">
              Daftarkan dan verifikasi "sidik jari" digital dokumen Anda. Ciptakan bukti integritas yang permanen, transparan, dan tak terbantahkan.
            </p>
            <div className="mt-10">
              <Link href="/verify" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 shadow-lg transition-transform transform hover:scale-105">
                <Rocket className="w-5 h-5 mr-3" />
                Mulai Sekarang
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
             <div className="w-72 h-72 bg-cyan-500/5 rounded-full flex items-center justify-center p-8">
                <div className="w-full h-full bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <KeyRound className="w-32 h-32 text-cyan-400 opacity-50" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ===== Bagian Tutorial "Cara Kerja" yang Dimodifikasi ===== */}
      <section id="how-it-works" className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Bagaimana Sistem Ini Bekerja?</h2>
            <p className="mt-2 text-slate-400">Pahami dua alur utama: Verifikasi dan Registrasi.</p>
          </div>

          {/* --- Alur untuk Verifikator --- */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-white mb-8">Alur Verifikasi Dokumen</h3>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-900/50 text-cyan-400 rounded-full mb-6"><Upload className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">1. Unggah File</h4>
                <p className="text-slate-400">Pilih file yang ingin diperiksa. Proses 100% aman dan privat di browser Anda.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-900/50 text-cyan-400 rounded-full mb-6"><Search className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">2. Pencocokan Hash</h4>
                <p className="text-slate-400">Sistem menghitung hash unik file dan mencocokkannya dengan data di blockchain.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-900/50 text-cyan-400 rounded-full mb-6"><FileText className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">3. Lihat Hasil</h4>
                <p className="text-slate-400">Dapatkan konfirmasi instan beserta detail pendaftar asli jika dokumen terverifikasi.</p>
              </div>
            </div>
          </div>

          {/* --- Alur BARU untuk Pendaftar --- */}
          <div>
            <h3 className="text-2xl font-semibold text-center text-white mb-8">Alur Registrasi Dokumen Baru</h3>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-purple-900/50 text-purple-300 rounded-full mb-6"><UserCheck className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">1. Siapkan Akun</h4>
                <p className="text-slate-400">Login dengan Google, lalu hubungkan dan verifikasi dompet MetaMask untuk menautkan identitas Anda.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-purple-900/50 text-purple-300 rounded-full mb-6"><Fingerprint className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">2. Daftarkan Hash</h4>
                <p className="text-slate-400">Pilih dokumen Anda. Hash uniknya akan dikirim ke smart contract melalui transaksi yang Anda setujui.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-purple-900/50 text-purple-300 rounded-full mb-6"><Award className="w-8 h-8" /></div>
                <h4 className="text-xl font-semibold text-white mb-2">3. Dapatkan Bukti Abadi</h4>
                <p className="text-slate-400">Setelah berhasil, dokumen Anda resmi tercatat di blockchain selamanya dan dapat diverifikasi siapa saja.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===== Bagian Fitur Unggulan dengan Desain Baru ===== */}
<section className="py-20 bg-slate-900"> {/* Latar belakang dibuat solid agar kartu menonjol */}
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white">Fondasi Sistem yang Kokoh</h2>
      <p className="mt-2 text-slate-400">Dibangun di atas prinsip-prinsip inti teknologi terdesentralisasi.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">

      {/* Kartu 1: Tak Terbantahkan */}
      <div className="feature-card relative bg-slate-800 p-8 rounded-xl border border-slate-700 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 bg-slate-900 rounded-lg mb-6 border border-slate-700">
          <Lock className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="font-bold text-lg text-white mb-2">Tak Terbantahkan</h3>
        <p className="text-slate-400 text-sm">Setiap catatan hash bersifat permanen. Setelah terdaftar di blockchain, ia tidak dapat diubah atau dihapus oleh siapa pun, selamanya.</p>
      </div>

      {/* Kartu 2: Aman & Privat */}
      <div className="feature-card relative bg-slate-800 p-8 rounded-xl border border-slate-700 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 bg-slate-900 rounded-lg mb-6 border border-slate-700">
          <FileText className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="font-bold text-lg text-white mb-2">Aman & Privat</h3>
        <p className="text-slate-400 text-sm">File asli Anda tidak pernah meninggalkan komputer. Sistem kami hanya menggunakan "sidik jari" digitalnya untuk proses verifikasi.</p>
      </div>

      {/* Kartu 3: Transparan */}
      <div className="feature-card relative bg-slate-800 p-8 rounded-xl border border-slate-700 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 bg-slate-900 rounded-lg mb-6 border border-slate-700">
          <Globe className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="font-bold text-lg text-white mb-2">Transparan</h3>
        <p className="text-slate-400 text-sm">Semua bukti transaksi registrasi dapat diaudit secara publik melalui halaman Log Audit dan block explorer seperti Etherscan.</p>
      </div>

    </div>
  </div>
</section>

      {/* ===== Bagian FAQ ===== */}
      <section id="faq" className="py-20">
         <div className="container mx-auto px-6 max-w-3xl">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-white">Pertanyaan yang Sering Diajukan (FAQ)</h2>
           </div>
           <div className="space-y-8 text-slate-300">
             <div>
               <h4 className="font-semibold text-lg text-white">Apakah file saya diunggah ke server?</h4>
               <p className="mt-2">
                 <span className="font-bold text-white">Tidak sama sekali.</span> Privasi Anda adalah prioritas kami. Seluruh proses penghitungan hash terjadi secara lokal di browser Anda. File asli Anda tidak pernah dikirim ke server kami atau ke blockchain.
               </p>
             </div>
             <div>
               <h4 className="font-semibold text-lg text-white">Apa itu "Hash Dokumen"?</h4>
               <p className="mt-2">
                 Hash adalah "sidik jari digital" unik yang dihasilkan dari isi file Anda. Jika file diubah sedikit saja, hash-nya akan berubah total, menjadikannya cara yang sangat andal untuk memeriksa apakah sebuah file masih asli.
               </p>
             </div>
             <div>
               <h4 className="font-semibold text-lg text-white">Apakah layanan ini gratis?</h4>
               <p className="mt-2">
                 <span className="font-bold text-white">Untuk memverifikasi dokumen, layanan ini 100% gratis.</span> Untuk mendaftarkan dokumen baru, Anda hanya perlu membayar biaya transaksi (gas fee) yang sangat kecil kepada jaringan blockchain Sepolia, bukan kepada kami.
               </p>
             </div>
              <div>
               <h4 className="font-semibold text-lg text-white">Siapa yang bisa melihat riwayat dokumen saya?</h4>
               <p className="mt-2">
                 Hanya Anda yang bisa melihat riwayat pendaftaran detail (seperti nama file) saat Anda login. Namun, untuk transparansi, jejak transaksi on-chain (seperti alamat dompet dan waktu) dapat dilihat oleh publik melalui halaman Log Audit.
               </p>
             </div>
           </div>
         </div>
      </section>
    </>
  );
}