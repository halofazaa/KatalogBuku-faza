import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Bookmark,
  Calendar,
  BookOpen,
  Globe,
  FileText,
  Building,
  Hash,
  Share2,
  PenLine,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Book } from '../types/book';
import { bookService } from '../services/bookService';
import { useBookContext } from '../context/BookContext';
import { NoteForm } from '../components/NoteForm';
import { BookCard } from '../components/BookCard';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, notes } = useBookContext();

  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    if (!id) return;

    const loadBookDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await bookService.getBookById(id);
        if (!isCancelled) {
          setBook(response.book);
          setRelatedBooks(response.relatedBooks || []);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || 'Gagal memuat rincian buku.');
          setIsLoading(false);
        }
      }
    };

    loadBookDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const favorited = book ? isFavorite(book.id) : false;

  // Filter notes that belong to this book
  const currentBookNotes = notes.filter(
    (n) => n.bookId === id || (book && n.bookTitle.toLowerCase() === book.title.toLowerCase())
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded-full w-40" />
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-clean grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 aspect-[3/4] bg-slate-200 rounded-2xl" />
          <div className="md:col-span-8 space-y-4">
            <div className="h-4 bg-orange-100 rounded-full w-24" />
            <div className="h-8 bg-slate-200 rounded-2xl w-3/4" />
            <div className="h-4 bg-slate-100 rounded-full w-1/2" />
            <div className="space-y-2 pt-4">
              <div className="h-3 bg-slate-100 rounded-full w-full" />
              <div className="h-3 bg-slate-100 rounded-full w-full" />
              <div className="h-3 bg-slate-100 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="py-16 max-w-md mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Buku Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 mb-6">{error || 'Informasi buku tidak tersedia.'}</p>
        <button
          type="button"
          onClick={() => navigate('/katalog')}
          className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <Link to="/katalog" className="text-slate-500 hover:text-orange-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-orange-700 font-bold">{book.categories?.[0] || 'Buku'}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 truncate max-w-xs">{book.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* Main Book Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-clean">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Book Cover, Action Buttons & Quick Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={book.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80'}
                alt={book.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
                }}
              />
              <button
                type="button"
                onClick={() => toggleFavorite(book.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                  favorited
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/90 text-slate-700 hover:bg-white hover:text-orange-500'
                }`}
                title={favorited ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
              >
                <Bookmark className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Quick Actions Under Cover */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
                className="w-full py-3 px-4 rounded-2xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <PenLine className="w-4 h-4" />
                <span>+ Buat Catatan Untuk Buku Ini</span>
              </button>

              {book.previewLink && (
                <a
                  href={book.previewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Buka Pratinjau Google Books</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Title, Metadata, Description & Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {book.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200"
                >
                  {cat}
                </span>
              ))}
              {book.language && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 uppercase">
                  {book.language}
                </span>
              )}
            </div>

            {/* Title & Author */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-slate-600 mt-2">
                Ditulis oleh{' '}
                <span className="text-slate-900 font-bold">
                  {book.authors?.join(', ') || 'Penulis Tidak Diketahui'}
                </span>
              </p>
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 w-fit">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(book.averageRating || 4.5)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                {book.averageRating ? book.averageRating.toFixed(1) : '4.5'}
              </span>
              {book.ratingsCount !== undefined && book.ratingsCount > 0 && (
                <span className="text-xs text-slate-400 tabular-nums">
                  ({book.ratingsCount.toLocaleString()} ulasan pembaca)
                </span>
              )}
            </div>

            {/* Metadata Spec Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>Tahun</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                  {book.publishedYear || '-'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <FileText className="w-3.5 h-3.5 text-orange-500" />
                  <span>Halaman</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                  {book.pageCount ? `${book.pageCount} Hal` : 'Digital'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <Building className="w-3.5 h-3.5 text-orange-500" />
                  <span>Penerbit</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 truncate">
                  {book.publisher || '-'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <Hash className="w-3.5 h-3.5 text-orange-500" />
                  <span>ISBN</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 tabular-nums truncate">
                  {book.isbn || 'Tersedia Digital'}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Sinopsis &amp; Deskripsi Buku
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                {book.description || 'Tidak ada deskripsi lengkap untuk buku ini.'}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Existing Notes for this Book */}
      {currentBookNotes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <h3 className="text-base font-extrabold text-slate-900">
              Catatan Anda Untuk Buku Ini ({currentBookNotes.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentBookNotes.map((n) => (
              <div
                key={n.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-clean space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-600">{n.noteTitle}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-bold tabular-nums">{n.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note Form Section */}
      <div id="note-section" className="pt-4">
        <NoteForm
          initialBookId={book.id}
          initialBookTitle={book.title}
          initialAuthor={book.authors?.[0] || ''}
          onSuccess={() => {
            setShowNoteModal(false);
          }}
        />
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Buku Terkait Lainnya</h3>
            <Link to="/katalog" className="text-xs font-bold text-orange-600 hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </div>
      )}

      {/* Modal Popup Note Form (if opened via button) */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowNoteModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-lg font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              &times;
            </button>
            <NoteForm
              initialBookId={book.id}
              initialBookTitle={book.title}
              initialAuthor={book.authors?.[0] || ''}
              onSuccess={() => setShowNoteModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
