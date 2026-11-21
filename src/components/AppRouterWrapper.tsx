'use client';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider } from '@/context/BookContext';
import { MainLayout } from '@/layouts/MainLayout';
import { CatalogPage } from '@/views/CatalogPage';
import { BookDetailPage } from '@/views/BookDetailPage';
import { NotesPage } from '@/views/NotesPage';

export const AppRouterWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <BookProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Redirect root '/' to '/katalog' */}
            <Route index element={<Navigate to="/katalog" replace />} />

            {/* Catalog Page (/katalog) */}
            <Route path="katalog" element={<CatalogPage />} />

            {/* Dynamic Route: Detail Buku (/buku/:id) */}
            <Route path="buku/:id" element={<BookDetailPage />} />

            {/* Notes & Collection Page (/catatan) */}
            <Route path="catatan" element={<NotesPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/katalog" replace />} />
          </Route>
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
};

export default AppRouterWrapper;
