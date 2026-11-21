import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { MainLayout } from './layouts/MainLayout';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { NotesPage } from './pages/NotesPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BookProvider>
        <Routes>
          {/* Nested Route: MainLayout membungkus seluruh sub-halaman via <Outlet /> */}
          <Route path="/" element={<MainLayout />}>
            {/* Redirect index path '/' ke '/katalog' */}
            <Route index element={<Navigate to="/katalog" replace />} />

            {/* Halaman Utama Katalog (/katalog) */}
            <Route path="katalog" element={<CatalogPage />} />

            {/* Dynamic Route: Detail Buku (/buku/:id) */}
            <Route path="buku/:id" element={<BookDetailPage />} />

            {/* Halaman Catatan & Koleksi Lokal (/catatan) */}
            <Route path="catatan" element={<NotesPage />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/katalog" replace />} />
          </Route>
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
};

export default App;
