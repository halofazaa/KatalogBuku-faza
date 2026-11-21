import { BookDetailResponse, BookFilterParams, BooksResponse } from '../types/book';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const bookService = {
  /**
   * Mengambil daftar buku dari Backend Next.js (/api/books)
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

    try {
      // 1. Coba melalui relative path (Vite proxy / production same-domain)
      const res = await fetch(API_BASE ? `${API_BASE}${endpoint}` : endpoint, {
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memuat data dari server.`);
      }

      return await res.json();
    } catch (err: any) {
      // 2. Jika relative path gagal (misal direct dev tanpa proxy), coba direct port 3001
      if (!API_BASE) {
        try {
          const directRes = await fetch(`http://localhost:3001${endpoint}`, {
            headers: { 'Accept': 'application/json' },
          });
          if (directRes.ok) {
            return await directRes.json();
          }
        } catch (_) {
          // Lanjutkan ke throw error asli
        }
      }
      throw new Error(err.message || 'Koneksi ke backend Next.js gagal. Pastikan backend aktif.');
    }
  },

  /**
   * Mengambil detail satu buku berdasarkan ID (/api/books/[id])
   */
  async getBookById(id: string): Promise<BookDetailResponse> {
    if (!id) {
      throw new Error('ID buku tidak valid.');
    }

    const endpoint = `/api/books/${encodeURIComponent(id)}`;

    try {
      const res = await fetch(API_BASE ? `${API_BASE}${endpoint}` : endpoint, {
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Buku tidak ditemukan.');
        }
        throw new Error(`HTTP Error ${res.status}: Gagal mengambil data detail buku.`);
      }

      return await res.json();
    } catch (err: any) {
      if (!API_BASE) {
        try {
          const directRes = await fetch(`http://localhost:3001${endpoint}`, {
            headers: { 'Accept': 'application/json' },
          });
          if (directRes.ok) {
            return await directRes.json();
          }
        } catch (_) {
          // Lanjutkan ke throw error
        }
      }
      throw new Error(err.message || 'Koneksi ke server gagal.');
    }
  },
};
