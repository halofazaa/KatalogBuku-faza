import { useState, useEffect, useCallback } from 'react';
import { Book, BookFilterParams } from '../types/book';
import { bookService } from '../services/bookService';

interface UseBooksResult {
  books: Book[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
}

/**
 * Custom hook untuk mengelola Server State buku dari Next.js backend.
 * Menyediakan data buku, status loading, penanganan error, empty state,
 * serta fungsionalitas coba lagi (retry / refetch).
 */
export function useBooks(params: BookFilterParams): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(params.page || 1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await bookService.getBooks({
          q: params.q,
          category: params.category,
          sort: params.sort,
          page: params.page || 1,
          limit: params.limit || 12,
        });

        if (!isCancelled) {
          setBooks(response.books || []);
          setTotalItems(response.totalItems || 0);
          setTotalPages(response.totalPages || 1);
          setCurrentPage(response.page || 1);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || 'Gagal memuat katalog buku dari backend.');
          setBooks([]);
          setIsLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      isCancelled = true;
    };
  }, [params.q, params.category, params.sort, params.page, params.limit, trigger]);

  const isEmpty = !isLoading && !error && books.length === 0;

  return {
    books,
    totalItems,
    totalPages,
    currentPage,
    isLoading,
    error,
    isEmpty,
    refetch,
  };
}
