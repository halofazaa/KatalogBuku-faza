import { BookDetailResponse, BookFilterParams, BooksResponse } from '../types/book';

export const bookService = {
  /**
   * Mengambil daftar buku dari Next.js Route Handler (/api/books)
   * dengan parameter pencarian, kategori, pengurutan, dan paginasi.
   */
  async getBooks(params: BookFilterParams = {}): Promise<BooksResponse> {
    const searchParams = new URLSearchParams();
    if (params.q) searchParams.set('q', params.q);
    if (params.category && params.category !== 'Semua' && params.category !== 'All') {
      searchParams.set('category', params.category);
    }
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/books${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(endpoint, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: Gagal memuat data dari server.`);
    }

    return await res.json();
  },

  /**
   * Mengambil detail satu buku berdasarkan ID (/api/books/[id])
   */
  async getBookById(id: string): Promise<BookDetailResponse> {
    if (!id) {
      throw new Error('ID buku tidak valid.');
    }

    const endpoint = `/api/books/${encodeURIComponent(id)}`;

    const res = await fetch(endpoint, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Buku tidak ditemukan.');
      }
      throw new Error(`HTTP Error ${res.status}: Gagal mengambil data detail buku.`);
    }

    return await res.json();
  },
};
