import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BookCatalog — Katalog Buku Interaktif',
  description: 'Aplikasi Web Katalog Buku Interaktif (React + Next.js Backend + TypeScript)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>"
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-800 antialiased font-manrope selection:bg-orange-100 selection:text-orange-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
