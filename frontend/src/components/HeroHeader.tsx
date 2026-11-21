import React from 'react';
import { Layers, CheckCircle2, Bookmark, Sparkles, BookOpen } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

interface HeroHeaderProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  totalResults?: number;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  badge = 'Katalog Buku Terpadu & Digital',
  title = 'Eksplorasi Ribuan Karya Buku & Jurnal Bacaan Anda',
  subtitle = 'Temukan inspirasi bacaan terbaik, telusuri rincian bibliografi dengan API, dan simpan catatan ulasan secara terorganisir.',
  totalResults,
}) => {
  const { notes, favorites, getReadingStats } = useBookContext();
  const stats = getReadingStats();

  const totalInteractions = stats.totalNotes + stats.favoritesCount;
  const progressRatio = Math.min(100, Math.max(15, (stats.completed / (stats.totalNotes || 1)) * 100));

  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Headline & Descriptive Text */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Small Orange Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200 text-orange-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>{badge}</span>
          </div>

          {/* Main Large Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {title}
          </h1>

          {/* Descriptive Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-orange-500" />
              <span>Katalog Terhubung:</span>
              <strong className="text-slate-800 tabular-nums font-bold">
                {totalResults !== undefined ? `${totalResults.toLocaleString()} Hasil` : 'Ribuan Buku'}
              </strong>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Next.js API Proxy:</span>
              <span className="text-emerald-700 font-bold">Aktif &amp; Siap</span>
            </div>
          </div>
        </div>

        {/* Right Side: Status Summary Card (CureLens Style) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-clean relative overflow-hidden transition-all hover:shadow-soft">
            
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Status Card */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Ringkasan Aktivitas</h3>
                  <p className="text-xs text-slate-500">Status Koleksi &amp; Ulasan Lokal</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Tersinkron
              </span>
            </div>

            {/* Segmented Orange Progress Bar */}
            <div className="my-5">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-slate-600">Progres Target Bacaan</span>
                <span className="text-orange-600 font-bold tabular-nums">
                  {Math.round(progressRatio)}% Selesai
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-2.5">
                {[1, 2, 3, 4].map((seg) => {
                  const activeRatio = (seg / 4) * 100;
                  const isFilled = progressRatio >= activeRatio - 15;
                  return (
                    <div
                      key={seg}
                      className={`rounded-full transition-all duration-300 ${
                        isFilled
                          ? 'bg-orange-500 shadow-sm shadow-orange-500/20'
                          : 'bg-slate-100'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 font-medium block">Catatan</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {stats.totalNotes}
                </span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 font-medium block">Selesai</span>
                <span className="text-xl font-extrabold text-orange-600 tabular-nums">
                  {stats.completed}
                </span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 font-medium block">Favorit</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {stats.favoritesCount}
                </span>
              </div>
            </div>

            {/* Micro Quote / Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Simpan catatan ulasan untuk setiap buku favoritmu</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
