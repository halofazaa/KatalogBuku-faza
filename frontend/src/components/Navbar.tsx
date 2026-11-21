import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, Bookmark, BookText, Menu, X, Sparkles } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notes, favorites } = useBookContext();

  const navItems = [
    { name: 'Katalog Buku', path: '/katalog', icon: BookOpen },
    { name: 'Catatan Bacaan', path: '/catatan', icon: BookText, count: notes.length },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F8FAFC]/90 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <Link to="/katalog" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                BookCatalog
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full border border-orange-200">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Interactive Book Platform &amp; Notes
            </p>
          </div>
        </Link>

        {/* Desktop Capsule Navigation Bar */}
        <nav className="hidden md:flex items-center bg-white p-1.5 rounded-full border border-slate-200 shadow-clean">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold tabular-nums ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/catatan"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold hover:bg-orange-100 transition-colors"
          >
            <Bookmark className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Koleksi Favorit</span>
            <span className="bg-orange-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {favorites.length}
            </span>
          </Link>

          <Link
            to="/catatan#form"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 hover:shadow-md transition-all duration-150"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>+ Catatan Baru</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white/20">
                  {item.count}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <Link
              to="/catatan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold"
            >
              {favorites.length} Favorit
            </Link>
            <Link
              to="/catatan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold"
            >
              + Buat Catatan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
