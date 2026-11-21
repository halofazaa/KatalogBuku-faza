import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Bookmark, Calendar, FileText } from 'lucide-react';
import { Book } from '../types/book';
import { useBookContext } from '../context/BookContext';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { toggleFavorite, isFavorite } = useBookContext();
  const favorited = isFavorite(book.id);

  const mainCategory = book.categories?.[0] || 'Umum';

  return (
    <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-clean hover:shadow-soft hover:border-orange-200 transition-all duration-200 flex flex-col justify-between">
      
      {/* Top Section: Cover & Quick Actions */}
      <div>
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-xs">
          <img
            src={book.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80'}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback image if remote URL fails
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
            }}
          />

          {/* Category Chip floating on top left */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-orange-800 rounded-full border border-orange-100 shadow-xs">
              {mainCategory}
            </span>
          </div>

          {/* Bookmark Button floating on top right */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(book.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
              favorited
                ? 'bg-orange-500 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-orange-500'
            }`}
            aria-label="Toggle Bookmark"
            title={favorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          >
            <Bookmark className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Rating & Year row */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="tabular-nums">
              {book.averageRating ? book.averageRating.toFixed(1) : '4.5'}
            </span>
            {book.ratingsCount !== undefined && book.ratingsCount > 0 && (
              <span className="text-slate-400 font-normal tabular-nums">
                ({book.ratingsCount.toLocaleString()})
              </span>
            )}
          </div>

          {book.publishedYear && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span className="tabular-nums">{book.publishedYear}</span>
            </div>
          )}
        </div>

        {/* Book Title */}
        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-1">
          <Link to={`/buku/${book.id}`}>{book.title}</Link>
        </h3>

        {/* Author Name */}
        <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-3">
          Oleh {book.authors?.join(', ') || 'Penulis Tidak Diketahui'}
        </p>

        {/* Brief Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {book.description || 'Tidak ada ringkasan tersedia.'}
        </p>
      </div>

      {/* Bottom Card Footer: Page Count & Pill Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span className="tabular-nums">
            {book.pageCount && book.pageCount > 0 ? `${book.pageCount} Hal` : 'Edisi Digital'}
          </span>
        </div>

        {/* Pill button in orange with arrow (CureLens aesthetic) */}
        <Link
          to={`/buku/${book.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-sm shadow-orange-500/20 group-hover:gap-2 transition-all"
        >
          <span>Detail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
