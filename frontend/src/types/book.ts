export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  publishedYear?: number;
  pageCount?: number;
  categories: string[];
  thumbnail?: string;
  language?: string;
  averageRating?: number;
  ratingsCount?: number;
  previewLink?: string;
  infoLink?: string;
  isbn?: string;
}

export interface BooksResponse {
  books: Book[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
  category: string;
  sort: string;
}

export interface BookDetailResponse {
  book: Book;
  relatedBooks?: Book[];
}

export type ReadingStatus = 'want-to-read' | 'reading' | 'completed';

export interface ReadingNote {
  id: string;
  bookId: string;
  bookTitle: string;
  authorName: string;
  noteTitle: string;
  content: string;
  rating: number; // 1 - 5
  status: ReadingStatus;
  tags: string[];
  publishedYear?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormState {
  bookId: string;
  bookTitle: string;
  authorName: string;
  noteTitle: string;
  content: string;
  rating: number;
  status: ReadingStatus;
  tags: string;
  publishedYear: string;
}

export type NoteFormErrors = {
  [K in keyof NoteFormState]?: string;
};

export interface BookFilterParams {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
