import Link from 'next/link';
import { Upload, Search, FileCheck, UserCheck, Fingerprint, Award, ArrowRight, BookOpenCheck, Shield, Globe } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Cara Kerja Sistem Verifikasi Dokumen
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
            Sistem ini menggunakan teknologi blockchain untuk memastikan keaslian dokumen digital. 
            Berikut penjelasan lengkap tentang cara kerja dan proses yang terlibat.
          </p>
        </div>

        {/* What is Blockchain Section */}
        <div className="mb-20">
          <div className="academic-card p-8 mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-cyan-400/20 rounded-lg mx-auto mb-4">
                <BookOpenCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Apa itu Blockchain?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Keamanan</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Data disimpan secara terenkripsi dan terdistribusi di banyak komputer, 
                  membuatnya sangat sulit untuk diubah atau dihapus.
                </p>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Transparansi</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Semua transaksi dapat dilihat secara publik, memastikan 
                  transparansi dan akuntabilitas penuh.
                </p>
              </div>
              <div className="text-center">
                <Fingerprint className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Immutability</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Setelah data disimpan di blockchain, data tersebut tidak dapat 
                  diubah atau dimanipulasi oleh siapa pun.
                </p>
              </div>
            </div>
          </div>

          <div className="academic-card p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Mengapa Blockchain untuk Verifikasi Dokumen?</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Dalam sistem verifikasi dokumen, blockchain berperan sebagai "buku besar" digital yang 
              menyimpan "sidik jari" (hash) dari setiap dokumen. Hash adalah kode unik yang dihasilkan 
              dari isi dokumen menggunakan algoritma kriptografi.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Jika dokumen diubah sedikit saja, hash-nya akan berubah drastis. Dengan membandingkan 
              hash dokumen saat ini dengan hash yang tersimpan di blockchain, kita dapat memastikan 
              apakah dokumen tersebut masih asli atau sudah dimodifikasi.
            </p>
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-white mb-12">
            Proses Verifikasi Dokumen (Akses Publik)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-lg mx-auto mb-6">
                <Upload className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">1. Upload Dokumen</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Pilih file PDF yang ingin Anda verifikasi. Proses ini dilakukan sepenuhnya 
                di browser Anda untuk menjaga privasi dokumen.
              </p>
            </div>
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-lg mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">2. Pencocokan Hash</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sistem menghitung hash unik dari dokumen Anda dan mencari hash tersebut 
                di database blockchain untuk memeriksa keasliannya.
              </p>
            </div>
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-lg mx-auto mb-6">
                <FileCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">3. Hasil Verifikasi</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Dapatkan konfirmasi instan apakah dokumen terdaftar di blockchain, 
                beserta informasi pendaftar dan waktu registrasi.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Process */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-white mb-12">
            Proses Registrasi Dokumen (Pengguna Terdaftar)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-lg mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">1. Autentikasi</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Login dengan Google, hubungkan wallet MetaMask, dan verifikasi 
                kepemilikan wallet untuk keamanan.
              </p>
            </div>
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-lg mx-auto mb-6">
                <Fingerprint className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">2. Registrasi Hash</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Upload dokumen dan setujui transaksi blockchain untuk menyimpan 
                hash dokumen secara permanen. Memerlukan sedikit gas fee Sepolia ETH. Bisa didapatkan <a 
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Disini</span>
                </a>
              </p>
            </div>
            <div className="academic-card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-lg mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">3. Konfirmasi</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Dokumen berhasil terdaftar di blockchain dan dapat diverifikasi 
                oleh siapa saja, kapan saja di masa depan.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-20">
          <div className="academic-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Detail Teknis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Teknologi yang Digunakan</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Ethereum Blockchain:</strong> Jaringan Sepolia untuk testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Smart Contract:</strong> Program otomatis untuk menyimpan hash</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Keccak-256 Hashing:</strong> Algoritma untuk menghasilkan sidik jari dokumen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>MetaMask:</strong> Wallet untuk berinteraksi dengan blockchain</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Keamanan & Privasi</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Dokumen tidak pernah dikirim ke server</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Hanya hash yang disimpan di blockchain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Proses hashing dilakukan di browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Data tersimpan secara permanen dan tidak dapat diubah</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center">
          <div className="academic-card p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Siap Mencoba Sistem Verifikasi?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Mulai dengan memverifikasi dokumen yang sudah terdaftar atau daftarkan dokumen baru Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/verify" className="btn-primary">
                <ArrowRight className="w-5 h-5 mr-2" />
                Mulai Verifikasi
              </Link>
              <Link href="/audit" className="btn-secondary">
                <BookOpenCheck className="w-5 h-5 mr-2" />
                Lihat Log Audit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}