import React, { useState } from 'react';
import {
  BookText,
  Star,
  Trash2,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { NoteForm } from '../components/NoteForm';
import { ReadingStatus } from '../types/book';
import { Link } from 'react-router-dom';

export const NotesPage: React.FC = () => {
  const { notes, deleteNote, favorites, getReadingStats } = useBookContext();
  const stats = getReadingStats();

  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | ReadingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(true);

  // Filter notes by status and search query
  const filteredNotes = notes.filter((note) => {
    const matchesStatus =
      activeStatusFilter === 'all' || note.status === activeStatusFilter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      note.noteTitle.toLowerCase().includes(q) ||
      note.bookTitle.toLowerCase().includes(q) ||
      note.authorName.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      note.tags.some((t) => t.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ReadingStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Selesai</span>
          </span>
        );
      case 'reading':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Sedang Dibaca</span>
          </span>
        );
      case 'want-to-read':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <Bookmark className="w-3 h-3" />
            <span>Ingin Dibaca</span>
          </span>
        );
    }
  };

  return (
    <div className="py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-clean relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <BookText className="w-3.5 h-3.5" />
              <span>Jurnal &amp; Koleksi Lokal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Catatan Ulasan &amp; Buku Favorit
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
              Kelola seluruh ulasan, kutipan inspiratif, dan progres status membaca secara lokal dengan Context API terintegrasi.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 block">Total</span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {stats.totalNotes}
              </span>
            </div>
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100 text-center">
              <span className="text-[11px] font-semibold text-orange-700 block">Selesai</span>
              <span className="text-xl font-extrabold text-orange-600 tabular-nums">
                {stats.completed}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 block">Dibaca</span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {stats.reading}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 block">Favorit</span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {stats.favoritesCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Note Form Container */}
      <div id="form">
        <NoteForm />
      </div>

      {/* Filter and Search Bar for Notes */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-clean space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({notes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveStatusFilter('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatusFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selesai ({stats.completed})
            </button>
            <button
              type="button"
              onClick={() => setActiveStatusFilter('reading')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatusFilter === 'reading'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sedang Dibaca ({stats.reading})
            </button>
            <button
              type="button"
              onClick={() => setActiveStatusFilter('want-to-read')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatusFilter === 'want-to-read'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ingin Dibaca ({stats.wantToRead})
            </button>
          </div>

          {/* Search Notes Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari catatan ulasan..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

        </div>
      </div>

      {/* Notes List */}
      <div>
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center max-w-md mx-auto my-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <BookText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Belum Ada Catatan Sesuai Filter
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Gunakan formulir di atas untuk menambahkan catatan ulasan baru untuk buku favorit Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-clean hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Status & Rating */}
                  <div className="flex items-center justify-between mb-3">
                    {getStatusBadge(note.status)}
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-bold tabular-nums text-slate-800">
                        {note.rating} / 5
                      </span>
                    </div>
                  </div>

                  {/* Note Title & Book Title */}
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-1">
                    {note.noteTitle}
                  </h3>
                  <div className="text-xs font-semibold text-orange-600 mb-3 flex items-center gap-1.5">
                    <span>Buku: {note.bookTitle}</span>
                    {note.bookId && !note.bookId.startsWith('custom-') && (
                      <Link
                        to={`/buku/${note.bookId}`}
                        className="text-slate-400 hover:text-orange-600"
                        title="Buka detail buku"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Note Content */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line mb-4 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                    "{note.content}"
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Date & Delete Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-auto">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span className="tabular-nums">
                      {new Date(note.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Hapus catatan "${note.noteTitle}"?`)) {
                        deleteNote(note.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus catatan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
