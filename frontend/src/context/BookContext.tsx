import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReadingNote, ReadingStatus } from '../types/book';

interface ReadingStats {
  totalNotes: number;
  completed: number;
  reading: number;
  wantToRead: number;
  favoritesCount: number;
}

interface BookContextType {
  notes: ReadingNote[];
  favorites: string[];
  customTags: string[];
  addNote: (noteData: Omit<ReadingNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, noteData: Partial<ReadingNote>) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  addCustomTag: (tag: string) => void;
  removeCustomTag: (tag: string) => void;
  getReadingStats: () => ReadingStats;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const INITIAL_NOTES: ReadingNote[] = [
  {
    id: 'note-01',
    bookId: 'clean-code-01',
    bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    authorName: 'Robert C. Martin',
    noteTitle: 'Prinsip Penamaan Variabel & Fungsi yang Bersih',
    content: 'Bab 2 dan 3 sangat membuka wawasan mengenai penamaan variabel yang intention-revealing dan ukuran fungsi yang idealnya hanya melakukan satu tugas kecil (Single Responsibility Principle). Sangat krusial untuk proyek tim.',
    rating: 5,
    status: 'completed',
    tags: ['Programming', 'Best Practice', 'Software Engineering'],
    publishedYear: 2008,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'note-02',
    bookId: 'filosofi-teras-09',
    bookTitle: 'Filosofi Teras: Filsafat Yunani-Romawi Kuno untuk Mental Tangguh',
    authorName: 'Henry Manampiring',
    noteTitle: 'Konsep Dikotomi Kendali Epictetus',
    content: 'Hal yang berada di bawah kendali kita adalah pikiran, respon, dan tindakan kita sendiri. Opini orang lain atau hasil akhir berada di luar kendali kita. Relevan sekali untuk menjaga fokus belajar.',
    rating: 5,
    status: 'reading',
    tags: ['Philosophy', 'Self-Improvement', 'Stoicism'],
    publishedYear: 2019,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'note-03',
    bookId: 'atomic-habits-07',
    bookTitle: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
    authorName: 'James Clear',
    noteTitle: 'Aturan 1% Better Everyday dan Habit Stacking',
    content: 'Fokus bukan pada tujuan (goal), melainkan pada sistem dan identitas yang ingin dibangun setiap hari. Buku wajib dibaca ulang setiap tahun.',
    rating: 5,
    status: 'completed',
    tags: ['Habits', 'Productivity'],
    publishedYear: 2018,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

const INITIAL_FAVORITES: string[] = ['clean-code-01', 'filosofi-teras-09', 'atomic-habits-07'];
const INITIAL_CUSTOM_TAGS: string[] = ['Rekomendasi Dosen', 'Koleksi Favorit', 'Target Baca 2026'];

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Reading notes state
  const [notes, setNotes] = useState<ReadingNote[]>(() => {
    try {
      const saved = localStorage.getItem('book_catalog_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  // 2. Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('book_catalog_favorites');
      return saved ? JSON.parse(saved) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  });

  // 3. Custom tags state
  const [customTags, setCustomTags] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('book_catalog_custom_tags');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_TAGS;
    } catch {
      return INITIAL_CUSTOM_TAGS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('book_catalog_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Failed to save notes to localStorage', e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('book_catalog_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('book_catalog_custom_tags', JSON.stringify(customTags));
    } catch (e) {
      console.warn('Failed to save customTags to localStorage', e);
    }
  }, [customTags]);

  const addNote = (noteData: Omit<ReadingNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: ReadingNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, noteData: Partial<ReadingNote>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...noteData, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isFavorite = (bookId: string) => {
    return favorites.includes(bookId);
  };

  const addCustomTag = (tag: string) => {
    const cleanTag = tag.trim();
    if (!cleanTag) return;
    if (!customTags.includes(cleanTag)) {
      setCustomTags(prev => [...prev, cleanTag]);
    }
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags(prev => prev.filter(t => t !== tag));
  };

  const getReadingStats = (): ReadingStats => {
    const completed = notes.filter(n => n.status === 'completed').length;
    const reading = notes.filter(n => n.status === 'reading').length;
    const wantToRead = notes.filter(n => n.status === 'want-to-read').length;
    return {
      totalNotes: notes.length,
      completed,
      reading,
      wantToRead,
      favoritesCount: favorites.length,
    };
  };

  return (
    <BookContext.Provider
      value={{
        notes,
        favorites,
        customTags,
        addNote,
        updateNote,
        deleteNote,
        toggleFavorite,
        isFavorite,
        addCustomTag,
        removeCustomTag,
        getReadingStats,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};
