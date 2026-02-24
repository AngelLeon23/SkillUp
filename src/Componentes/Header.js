"use client";
import { User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header({ currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/catalogo')}>
            <span className="text-white font-bold text-3xl tracking-wide">SkillUp</span>
            <p className="text-xs text-green-100">Capacitación Petrolera</p>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => router.push('/catalogo')}
              className={`hover:text-green-100 transition-colors ${pathname === '/catalogo' ? 'text-yellow-400' : ''}`}
            >
              Catálogo
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className={`hover:text-green-100 transition-colors ${pathname === '/dashboard' ? 'text-yellow-400' : ''}`}
            >
              Mi Dashboard
            </button>
            <button
              onClick={() => router.push('/perfil')}
              className={`hover:text-green-100 transition-colors ${pathname === '/perfil' ? 'text-yellow-400' : ''}`}
            >
              Mi Perfil
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">{currentUser?.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-green-600 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <button onClick={() => { router.push('/catalogo'); setMobileMenuOpen(false); }} className={`text-left hover:text-green-100 ${pathname === '/catalogo' ? 'text-yellow-400' : ''}`}>Catálogo</button>
              <button onClick={() => { router.push('/dashboard'); setMobileMenuOpen(false); }} className={`text-left hover:text-green-100 ${pathname === '/dashboard' ? 'text-yellow-400' : ''}`}>Mi Dashboard</button>
              <button onClick={() => { router.push('/perfil'); setMobileMenuOpen(false); }} className={`text-left hover:text-green-100 ${pathname === '/perfil' ? 'text-yellow-400' : ''}`}>Mi Perfil</button>
              <div className="flex items-center gap-2 text-sm pt-2 border-t border-green-600">
                <User className="w-4 h-4" />
                <span>{currentUser?.name}</span>
              </div>
              <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-full justify-center">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}