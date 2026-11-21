import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RefreshCw, AlertTriangle, BookX, ArrowUpDown } from 'lucide-react';
import { HeroHeader } from '../components/HeroHeader';
import { StepperBar } from '../components/StepperBar';
import { CategoryChipGroup } from '../components/CategoryChipGroup';
import { BookCard } from '../components/BookCard';
import { Pagination } from '../components/Pagination';
import { useBooks } from '../hooks/useBooks';
import { useDebounce } from '../hooks/useDebounce';

export const CatalogPage: React.FC = () => {
  // 1. URL State via useSearchParams (disinkronkan dengan URL)
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'Semua';
  const urlSort = searchParams.get('sort') || 'relevance';
  const urlPage = parseInt(searchParams.get('page') || '1', 10);

  // 2. Local State untuk input pencarian langsung sebelum debounce & stepper step
  const [searchInput, setSearchInput] = useState(urlQuery);
  const [stepperStep, setStepperStep] = useState(1);
  const debouncedSearch = useDebounce(searchInput, 450);

  // Sinkronisasi debounced search ke URL State
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (debouncedSearch !== currentQ) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedSearch) {
          next.set('q', debouncedSearch);
        } else {
          next.delete('q');
        }
        next.set('page', '1'); // reset ke halaman 1 saat pencarian berganti
        return next;
      });
    }
  }, [debouncedSearch, setSearchParams, searchParams]);

  // Sinkronisasi jika URL diubah lewat navigasi tombol back/forward
  useEffect(() => {
    setSearchInput(urlQuery);
  }, [urlQuery]);

  // 3. Server State melalui custom hook useBooks
  const {
    books,
    totalItems,
    totalPages,
    currentPage,
    isLoading,
    error,
    isEmpty,
    refetch,
  } = useBooks({
    q: urlQuery,
    category: urlCategory,
    sort: urlSort,
    page: urlPage,
    limit: 12,
  });

  // Handler untuk pergantian kategori
  const handleSelectCategory = (newCat: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newCat && newCat !== 'Semua') {
        next.set('category', newCat);
      } else {
        next.delete('category');
      }
      next.set('page', '1');
      return next;
    });
    setStepperStep(2);
  };

  // Handler untuk pergantian sorting
  const handleSelectSort = (newSort: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSort && newSort !== 'relevance') {
        next.set('sort', newSort);
      } else {
        next.delete('sort');
      }
      next.set('page', '1');
      return next;
    });
    setStepperStep(2);
  };

  // Handler untuk pergantian halaman paginasi
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', newPage.toString());
      return next;
    });
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Handler reset semua filter
  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
    setStepperStep(1);
  };

  return (
    <div className="pb-16">
      
      {/* Hero Section dengan Badge Oranye & Kartu Ringkasan Kanan */}
      <HeroHeader
        badge="Katalog Buku Terbuka &amp; Digital"
        title="Temukan Karya Literasi &amp; Kelola Jurnal Bacaan Anda"
        subtitle="Jelajahi ribuan buku dari berbagai domain keilmuan, filter instan, dan pencarian cepat."
        totalResults={totalItems}
      />

      {/* Stepper Horizontal 3 Langkah (CureLens Style) */}
      <StepperBar
        currentStep={stepperStep}
        onSelectStep={(step) => {
          setStepperStep(step);
          if (step === 1) {
            window.scrollTo({ top: 200, behavior: 'smooth' });
          } else if (step === 2) {
            const el = document.getElementById('filter-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (step === 3) {
            window.location.href = '/catatan';
          }
        }}
      />

      {/* Search Bar & Sort Controls */}
      <div id="filter-section" className="bg-white rounded-3xl p-4 md:p-5 border border-slate-200/90 shadow-clean mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Input Field */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-orange-500" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari berdasarkan judul buku, nama penulis, atau topik..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-56">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
              </div>
              <select
                value={urlSort}
                onChange={(e) => handleSelectSort(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer appearance-none transition-all"
              >
                <option value="relevance">Urutkan: Paling Relevan</option>
                <option value="title_asc">Judul: A &rarr; Z</option>
                <option value="title_desc">Judul: Z &rarr; A</option>
                <option value="year_desc">Tahun: Terbaru</option>
                <option value="year_asc">Tahun: Terlama</option>
                <option value="rating_desc">Rating: Tertinggi</option>
              </select>
            </div>

            {/* Clear All Button */}
            {(urlQuery || urlCategory !== 'Semua' || urlSort !== 'relevance') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 shrink-0 transition-colors"
                title="Reset filter"
              >
                Reset
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Category & Custom Tag Chips Group */}
      <CategoryChipGroup
        selectedCategory={urlCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area: Loading / Error / Empty / Grid */}
      <div className="mt-4">
        
        {/* 1. Loading State (Clean Skeleton Grid) */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-clean space-y-4"
              >
                <div className="aspect-[3/4] w-full rounded-2xl bg-slate-200/80" />
                <div className="h-4 bg-slate-200 rounded-full w-2/3" />
                <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-slate-100 rounded-full w-full" />
                  <div className="h-3 bg-slate-100 rounded-full w-4/5" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="h-3 bg-slate-100 rounded-full w-1/4" />
                  <div className="h-7 bg-orange-200/50 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State (Card Pesan Error & Tombol Coba Lagi) */}
        {!isLoading && error && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-clean text-center max-w-xl mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Gagal Memuat Katalog Buku
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {error}
            </p>
            <button
              type="button"
              onClick={refetch}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-sm shadow-orange-500/25 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi (Retry)</span>
            </button>
          </div>
        )}

        {/* 3. Empty State (Pesan Informatif Saat Pencarian/Filter Kosong) */}
        {!isLoading && !error && isEmpty && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-clean text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 mx-auto mb-4">
              <BookX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Buku Tidak Ditemukan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Tidak ada buku yang cocok dengan kata kunci{' '}
              {urlQuery && <strong className="text-orange-600">"{urlQuery}"</strong>} pada kategori{' '}
              <strong className="text-slate-800">"{urlCategory}"</strong>.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* 4. Success State: Books Grid */}
        {!isLoading && !error && !isEmpty && (
          <>
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs font-bold text-slate-500">
                Menampilkan{' '}
                <span className="text-slate-900 tabular-nums font-extrabold">{books.length}</span> dari{' '}
                <span className="text-slate-900 tabular-nums font-extrabold">{totalItems}</span> total buku
              </p>
              {urlCategory !== 'Semua' && (
                <span className="text-xs font-bold text-orange-700 bg-orange-100/70 border border-orange-200 px-3 py-1 rounded-full">
                  Kategori: {urlCategory}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </div>

    </div>
  );
};
