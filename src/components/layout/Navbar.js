import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { BookOpenCheck, LogIn, Menu, X } from 'lucide-react';
import LoginModal from '../LoginModal';
import UserMenuModal from '../UserMenuModal';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuModalOpen, setIsUserMenuModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User Avatar Button
  const UserAvatarButton = () => (
    <button onClick={() => setIsUserMenuModalOpen(true)} className="cursor-pointer">
      <Image 
        src={session.user.image} 
        alt="User Avatar" 
        width={32} 
        height={32} 
        className="rounded-full border-2 border-slate-600 hover:border-cyan-400 transition-colors"
      />
    </button>
  );

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-700/50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 text-xl font-bold text-white hover:text-cyan-400 transition-colors">
              <BookOpenCheck className="w-7 h-7 text-cyan-400" />
              <span>DocVerify</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/verify" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Verifikasi
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Cara Kerja
              </Link>
              <Link href="/audit" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log Audit
              </Link>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop User Section */}
              <div className="hidden md:flex items-center">
                {status === 'loading' && (
                  <div className="text-sm text-slate-400">Loading...</div>
                )}
                
                {session ? (
                  <UserAvatarButton />
                ) : (
                  status !== 'loading' && (
                    <button 
                      onClick={() => setIsLoginModalOpen(true)} 
                      className="btn-secondary text-xs px-4 py-2"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Masuk
                    </button>
                  )
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
              <div className="flex flex-col gap-4 pt-4">
                <Link 
                  href="/verify" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Verifikasi
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cara Kerja
                </Link>
                <Link 
                  href="/audit" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log Audit
                </Link>
                
                {/* Mobile User Section */}
                <div className="pt-4 border-t border-slate-700">
                  {session ? (
                    <div className="flex items-center gap-3">
                      <Image 
                        src={session.user.image} 
                        alt="User Avatar" 
                        width={24} 
                        height={24} 
                        className="rounded-full"
                      />
                      <button 
                        onClick={() => {
                          setIsUserMenuModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm text-slate-300"
                      >
                        {session.user.name}
                      </button>
                    </div>
                  ) : (
                    status !== 'loading' && (
                      <button 
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="btn-secondary text-xs px-4 py-2 w-full justify-center"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Masuk
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onRequestClose={() => setIsLoginModalOpen(false)} 
      />
      <UserMenuModal
        isOpen={isUserMenuModalOpen}
        onRequestClose={() => setIsUserMenuModalOpen(false)}
      />
    </>
  );
}