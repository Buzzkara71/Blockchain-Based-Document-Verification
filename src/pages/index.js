import Link from 'next/link';
import { BookOpenCheck, ArrowRight, Shield, FileText, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section - Simplified and Academic */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-95"></div>
        <div className="relative container mx-auto px-6 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center py-20">
          
          <div className="mb-8">
            <BookOpenCheck className="w-16 h-16 text-cyan-400 mx-auto" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Sistem Verifikasi Dokumen
            <span className="block text-cyan-400 mt-2">Berbasis Blockchain</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-300 mb-8">
            Sistem ini menggunakan teknologi blockchain untuk memverifikasi keaslian dokumen digital. 
            Setiap dokumen diubah menjadi hash unik yang disimpan secara permanen di blockchain Ethereum, 
            memungkinkan verifikasi yang transparan dan tidak dapat dimanipulasi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/verify" className="btn-primary">
              <FileText className="w-5 h-5 mr-2" />
              Mulai Verifikasi
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              <BookOpenCheck className="w-5 h-5 mr-2" />
              Pelajari Cara Kerja
            </Link>
          </div>

        </div>
      </section>

      {/* Key Features - Academic Context */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            Mengapa Menggunakan Blockchain untuk Verifikasi Dokumen?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="academic-card p-6 text-center">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-3">Keamanan Tinggi</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Data tersimpan di blockchain yang terdesentralisasi dan tidak dapat diubah, 
                memberikan jaminan keamanan maksimal.
              </p>
            </div>
            
            <div className="academic-card p-6 text-center">
              <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-3">Verifikasi Instan</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Proses verifikasi dilakukan secara otomatis dengan mencocokkan hash dokumen 
                dengan data yang tersimpan di blockchain.
              </p>
            </div>
            
            <div className="academic-card p-6 text-center">
              <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-3">Transparansi Penuh</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Semua transaksi dan verifikasi dapat dilihat secara publik di blockchain, 
                memastikan transparansi dan akuntabilitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Proses Verifikasi Sederhana
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Sistem ini dirancang untuk memudahkan proses verifikasi dokumen dengan 
            langkah-langkah yang intuitif dan hasil yang dapat dipercaya.
          </p>
          <Link href="/how-it-works" className="btn-primary">
            <ArrowRight className="w-5 h-5 mr-2" />
            Lihat Penjelasan Lengkap
          </Link>
        </div>
      </section>
    </>
  );
}