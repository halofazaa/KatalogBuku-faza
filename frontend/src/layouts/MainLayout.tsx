import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { BookOpen, Heart, Code2, Globe } from 'lucide-react';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      
      {/* Top Floating / Sticky Capsule Navbar */}
      <Navbar />

      {/* Main Page Content (via React Router <Outlet />) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </main>

      {/* Clean Airy Footer (CureLens Aesthetic) */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm">
                  <BookOpen className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  BookCatalog
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Aplikasi Web Katalog Buku Interaktif.
              </p>
              
            </div>

            {/* Col 2: Navigasi Cepat */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Navigasi
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-500">
                <li>
                  <Link to="/katalog" className="hover:text-orange-600 transition-colors">
                    Katalog Utama &amp; Pencarian
                  </Link>
                </li>
                <li>
                  <Link to="/catatan" className="hover:text-orange-600 transition-colors">
                    Catatan &amp; Koleksi Lokal
                  </Link>
                </li>
                <li>
                  <a
                    href="http://localhost:3001/api/books"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Endpoint Next.js API</span>
                    <Globe className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Tech Stack */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Teknologi
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Next.js', 'React Router', 'Tailwind CSS', 'Context API', 'Google Books API'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} BookCatalog. Proyek Tugas Pemrograman Aplikasi Web (PAW).
            </p>
            <p className="flex items-center gap-1 text-slate-500 font-medium">
              <span>Dibuat dengan dedikasi</span>
              <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>untuk literasi digital</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
