# 📚 BookCatalog — Aplikasi Web Katalog Buku Interaktif
> **Proyek Tugas Pemrograman Aplikasi Web (PAW)**  
> **Arsitektur:** Monorepo (Frontend React + Backend Next.js API Proxy + TypeScript)  
> **Desain UI:** Adaptasi estetika CureLens (*Clean, Airy, Card-based*), Palet Aksen Oranye, dan Tipografi Manrope (*Tabular Numbers*).
<img width="1127" height="762" alt="Screenshot 2026-11-21 131021" src="https://github.com/user-attachments/assets/1527141d-68a0-4a5f-9aab-cb9fd96dc768" />
<img width="1138" height="861" alt="Screenshot 2026-11-21 131033" src="https://github.com/user-attachments/assets/41aa1d9a-3b27-4013-9bc0-46a0431d6ac9" />
<img width="1186" height="702" alt="Screenshot 2026-11-21 131045" src="https://github.com/user-attachments/assets/0f109144-8148-4f0c-8be5-427f047d4afc" />
<img width="1105" height="822" alt="Screenshot 2026-11-21 131138" src="https://github.com/user-attachments/assets/c5ba248b-9b01-47f1-a9d7-3a1ef14dd77e" />




---

## 📑 Daftar Isi
1. [Ringkasan Proyek & Tujuan](#1-ringkasan-proyek--tujuan)
2. [Sistem Desain UI (CureLens + Aksen Oranye)](#2-sistem-desain-ui)
3. [Arsitektur & Struktur Folder Monorepo](#3-arsitektur--struktur-folder-monorepo)
4. [Kebutuhan Fungsional & Fitur Utama](#4-kebutuhan-fungsional--fitur-utama)
5. [Implementasi 5 Jenis State Management](#5-implementasi-5-jenis-state-management)
6. [Spesifikasi Backend API (Next.js Route Handlers)](#6-spesifikasi-backend-api-nextjs-route-handlers)
7. [Panduan Instalasi & Menjalankan Aplikasi](#7-panduan-instalasi--menjalankan-aplikasi)
8. [Panduan Deployment & Pengumpulan](#8-panduan-deployment--pengumpulan)

---

## 1. Ringkasan Proyek & Tujuan

**BookCatalog** adalah aplikasi katalog buku modern dan interaktif yang memadukan keunggulan **React (Client-Side Rendering dengan React Router)** untuk pengalaman pengguna yang dinamis tanpa *page reload*, serta **Next.js (App Router Route Handlers)** sebagai lapisan *backend proxy & aggregator*.

Backend bertugas mengambil data dari public API katalog buku (Google Books API / Open Library API), menormalisasi skema data, mengimplementasikan *server-side search, filtering, sorting, pagination*, serta mengamankan komunikasi API dari masalah CORS.

---

## 2. Sistem Desain UI

Aplikasi ini mengadaptasi estetika antarmuka **CureLens** dengan penyesuaian khusus:
- **Tipografi (Manrope):** Menggunakan font modern **Manrope** (bobot 400, 500, 600, 700, 800) dari Google Fonts, dilengkapi kelas utilitas `tabular-nums` untuk perataan angka pada nomor halaman, tahun terbit, dan indikator kuantitatif.
- **Palet Warna Aksen Oranye:**
  - `Primary Orange` (`#F97316` / `#EA580C`): Tombol navigasi aktif, badge kategori, stepper aktif, ring fokus input, dan tombol aksi utama (*pill button* kanan bawah).
  - `Soft Orange Surface` (`#FFF7ED` / `#FFEDD5`): Latar belakang lembut kartu status dan chip aktif dengan border `#FED7AA`.
  - `Canvas & Card Surface`: Latar kanvas abu-abu sangat terang (`#F8FAFC`), kartu putih bersih (`#FFFFFF`) dengan border halus (`#E2E8F0`), sudut membulat lebar (`rounded-2xl` & `rounded-3xl`), serta tombol sekunder gelap (`#111827`).
- **Komponen Kunci Sesuai Referensi:**
  1. **Header / Navbar Kapsul:** Logo brand di kiri, navigasi kapsul membulat di kanan (*Katalog Buku*, *Catatan Bacaan*), serta badge jumlah koleksi tersimpan.
  2. **Hero Section & Kartu Ringkasan Kanan:** Headline informatif, badge oranye beranimasi pulse, serta kartu status aktivitas di kanan dengan bilah progres segmen oranye.
  3. **Stepper Horizontal 3 Langkah:** Bilah alur langkah 1 (*Jelajahi Katalog*), 2 (*Filter & Urutkan*), dan 3 (*Catatan & Koleksi*) dengan highlight oranye lembut.
  4. **Pill/Chip Kategori Interaktif:** Deretan chip kategori yang dapat dipilih (klik untuk membatalkan dengan ikon $\times$), kolom input tag kustom dengan tombol gelap **Tambah**, dan tombol pill oranye berikon panah.

---

## 3. Arsitektur & Struktur Folder Monorepo

Struktur direktori memisahkan tanggung jawab (*separation of concerns*) secara ketat antara antarmuka, logika aplikasi, akses layanan HTTP, dan backend Next.js:

```plaintext
book-catalog-app/
├── backend/                          # Next.js Backend (TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   └── api/
│   │   │       └── books/
│   │   │           ├── route.ts      # GET /api/books (search, filter, sort, pagination)
│   │   │           └── [id]/
│   │   │               └── route.ts  # GET /api/books/[id] (detail buku & related)
│   │   ├── lib/
│   │   │   └── externalBookApi.ts    # Integrasi API publik + fallback repository
│   │   └── types/
│   │       └── book.ts               # Shared TypeScript interfaces
│   ├── next.config.mjs               # Konfigurasi CORS & headers Next.js
│   ├── tsconfig.json                 # TypeScript compiler backend
│   └── package.json
│
├── frontend/                         # React + TypeScript (.tsx) + React Router
│   ├── src/
│   │   ├── components/               # 7 Reusable UI Components
│   │   │   ├── Navbar.tsx            # Header dengan kapsul navigasi oranye
│   │   │   ├── HeroHeader.tsx        # Badge oranye, judul, & kartu status kanan
│   │   │   ├── StepperBar.tsx        # Bilah 3 langkah bernomor
│   │   │   ├── CategoryChipGroup.tsx # Pilihan chip kategori + input kustom
│   │   │   ├── BookCard.tsx          # Kartu buku bergaya clean rounded-3xl
│   │   │   ├── Pagination.tsx        # Navigasi halaman tabular-nums
│   │   │   └── NoteForm.tsx          # Formulir controlled + validasi ketat
│   │   ├── pages/                    # Halaman React Router (.tsx)
│   │   │   ├── CatalogPage.tsx       # Halaman utama katalog (/katalog)
│   │   │   ├── BookDetailPage.tsx    # Halaman dynamic route (/buku/:id)
│   │   │   └── NotesPage.tsx         # Halaman catatan lokal (/catatan)
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx        # Nested route layout (<Outlet />)
│   │   ├── hooks/                    # Custom Hooks (.ts)
│   │   │   ├── useBooks.ts           # Fetch server state + loading/error/empty
│   │   │   └── useDebounce.ts        # Debounce input pencarian
│   │   ├── services/                 # Akses HTTP ke Next.js Backend (.ts)
│   │   │   └── bookService.ts        # Service layer API
│   │   ├── context/                  # Context API Global State (.tsx)
│   │   │   └── BookContext.tsx       # Manajemen catatan, favorit, & custom tags
│   │   ├── types/                    # Definisi Interface & Type TypeScript (.ts)
│   │   │   └── book.ts
│   │   ├── App.tsx                   # Konfigurasi React Router (nested & dynamic)
│   │   ├── main.tsx                  # Entry point React 18
│   │   └── index.css                 # Font Manrope, tema oranye & tabular-nums
│   ├── tailwind.config.js            # Konfigurasi palet tema & typography
│   ├── vite.config.ts                # Vite config & API reverse proxy
│   └── package.json
│
├── package.json                      # Root Monorepo Orchestration Scripts
└── README.md                         # Dokumentasi teknis lengkap
```

---

## 4. Kebutuhan Fungsional & Fitur Utama

### 4.1 Routing & Navigasi (React Router)
- **Client-Side Routing:** Perpindahan antarhalaman menggunakan `<Link>`, `<NavLink>`, dan `useNavigate()` tanpa me-refresh seluruh halaman browser.
- **Nested Route (`MainLayout.tsx`):** Layout induk membungkus halaman-halaman anak melalui `<Outlet />`, mempertahankan keberadaan navbar kapsul, footer, dan kerangka halaman.
- **3 Halaman Utama & Dynamic Route:**
  1. `/katalog` (atau `/`): Halaman katalog interaktif dengan pencarian, filter chip kategori, pengurutan, dan kontrol paginasi.
  2. `/buku/:id`: Dynamic route untuk menampilkan rincian buku lengkap berdasarkan parameter `:id` URL.
  3. `/catatan`: Halaman jurnal bacaan dan pengelolaan koleksi ulasan lokal.

### 4.2 Backend Next.js & Layanan Data API
- `GET /api/books`: Mengambil query `q`, `category`, `sort`, `page`, dan `limit`. Mengembalikan data buku yang dinormalisasi, informasi total data, dan total halaman.
- `GET /api/books/[id]`: Mengambil rincian detail buku beserta rekomendasi buku terkait (*related books*).
- **Frontend Service Layer (`bookService.ts`):** Memisahkan seluruh panggilan HTTP dari komponen presentasi.
- **Tiga Status Data:**
  - *Loading State:* Skeleton card beranimasi halus saat memuat data.
  - *Error State:* Kartu pesan kesalahan dilengkapi tombol **Coba Lagi (Retry)**.
  - *Empty State:* Ilustrasi informatif jika buku yang dicari tidak ditemukan disertai tombol **Reset Semua Filter**.

### 4.3 Fitur Pencarian, Filter & Urut
- **Pencarian Cepat:** Pencarian judul atau nama penulis dengan *debouncing* (450ms) agar tidak membebani server saat mengetik.
- **Filter Kategori Dinamis:** Memilih dari kategori populer (*Technology, Programming, Fiction, Philosophy, Design, dll.*) serta menambahkan tag kustom baru secara langsung.
- **Pengurutan Fleksibel:** Berdasarkan *Paling Relevan*, *Judul A–Z*, *Judul Z–A*, *Tahun Terbit (Terbaru/Terlama)*, dan *Rating Tertinggi*.
- **Paginasi Akurat:** Navigasi tombol *Sebelumnya*, nomor halaman dengan indikator elipsis, dan tombol *Berikutnya*.

### 4.4 Form Interaktif & Validasi Input (`NoteForm.tsx`)
- Dibuat dengan pola **Controlled Components** (seluruh nilai input dan perubahan `onChange` dikelola dalam state TypeScript).
- **Aturan Validasi Input:**
  - Judul Buku: Wajib diisi (minimal 2 karakter).
  - Nama Penulis: Wajib diisi (minimal 2 karakter).
  - Judul Catatan: Wajib diisi (minimal 4 karakter).
  - Isi Ulasan/Catatan: Wajib diisi (minimal 15 karakter).
  - Rating: Angka valid rentang 1 hingga 5 bintang.
  - Tahun Terbit: Angka tahun valid antara 1800 hingga tahun sekarang + 1.
- **Pemberitahuan Kesalahan:** Pesan peringatan berwarna merah/oranye tegas muncul tepat di bawah field yang tidak valid dan mencegah form dikirim sebelum data valid.

---

## 5. Implementasi 5 Jenis State Management

Aplikasi ini menerapkan kelima jenis state management sesuai ketentuan PRD:

| Jenis State | Definisi Teknis | Lokasi File & Bukti Implementasi |
| :--- | :--- | :--- |
| **Local State** | Mengelola status UI lokal komponen mandiri. | `useState` pada `CatalogPage.tsx` (input teks sebelum debounce, aktif stepper), `Navbar.tsx` (buka/tutup mobile drawer), dan `BookDetailPage.tsx` (modal catatan). |
| **Global State** | Berbagi data lintas halaman menggunakan React Context API. | `src/context/BookContext.tsx` untuk menyimpan daftar catatan bacaan, status membaca (*completed / reading / want-to-read*), ID buku favorit, dan tag kustom yang dipersistensikan ke `localStorage`. |
| **Server State** | Mengelola status permintaan data backend (loading, error, empty, refetch). | Custom hook `src/hooks/useBooks.ts` yang mengelola `books`, `isLoading`, `error`, `isEmpty`, `totalPages`, dan fungsi `refetch()`. |
| **URL State** | Menyinkronkan parameter pencarian, filter, sort, dan pagination ke URL query string. | `useSearchParams` pada `src/pages/CatalogPage.tsx` (`?q=clean&category=Technology&sort=year_desc&page=1`), sehingga URL dapat dibagikan (*shareable*) atau di-refresh tanpa kehilangan filter. |
| **Form State** | Mengontrol nilai input form dan error validasi terstruktur dengan TypeScript. | `src/components/NoteForm.tsx` dengan tipe `NoteFormState` dan `NoteFormErrors` untuk mengontrol controlled inputs dan menampilkan inline error messages. |

---

## 6. Spesifikasi Backend API (Next.js Route Handlers)

Backend berjalan secara independen pada port `3001` (atau melalui reverse proxy frontend Vite di port `5173`):

### 1. `GET /api/books`
- **Query Parameters:**
  - `q` *(opsional)*: Kata kunci pencarian (judul, penulis, atau kata kunci).
  - `category` *(opsional)*: Filter kategori buku (misal: `Technology`, `Fiction`).
  - `sort` *(opsional)*: `relevance` | `title_asc` | `title_desc` | `year_desc` | `year_asc` | `rating_desc`.
  - `page` *(opsional, default: 1)*: Nomor halaman.
  - `limit` *(opsional, default: 12)*: Jumlah buku per halaman.
- **Contoh Respons JSON:**
```json
{
  "books": [
    {
      "id": "clean-code-01",
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "authors": ["Robert C. Martin"],
      "description": "Even bad code can function...",
      "publisher": "Prentice Hall",
      "publishedYear": 2008,
      "pageCount": 464,
      "categories": ["Technology", "Programming"],
      "thumbnail": "https://...",
      "averageRating": 4.7,
      "ratingsCount": 3840
    }
  ],
  "totalItems": 12,
  "page": 1,
  "limit": 12,
  "totalPages": 1,
  "query": "clean",
  "category": "Technology",
  "sort": "relevance"
}
```

### 2. `GET /api/books/[id]`
- **URL Parameter:** `id` (ID unik buku).
- **Contoh Respons JSON:**
```json
{
  "book": {
    "id": "clean-code-01",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "authors": ["Robert C. Martin"],
    ...
  },
  "relatedBooks": [ ... ]
}
```

---

## 7. Panduan Instalasi & Menjalankan Aplikasi

Pastikan di komputer Anda telah terinstal **Node.js** (versi 18.x atau lebih baru).

### Langkah 1: Kloning Repository
```bash
git clone <URL_REPOSITORY_ANDA>
cd "PAW8-Katalog Buku"
```

### Langkah 2: Menginstal Dependensi

Buka terminal dan instal dependensi di kedua sisi:

**Terminal 1 (Backend Next.js):**
```bash
cd backend
npm install
```

**Terminal 2 (Frontend React):**
```bash
cd frontend
npm install
```

---

### Langkah 3: Menjalankan Mode Pengembangan (*Development*)

**Jalankan Backend (Next.js - Port 3001):**
```bash
cd backend
npm run dev
```
*Backend aktif di: `http://localhost:3001`*

**Jalankan Frontend (React + Vite - Port 5173):**
```bash
cd frontend
npm run dev
```
*Buka browser di: `http://localhost:5173`*

> **Tips:** Vite telah dikonfigurasi dengan reverse proxy otomatis untuk `/api`, sehingga permintaan frontend ke `/api/books` akan secara otomatis diteruskan ke backend Next.js di `http://localhost:3001/api/books`.

---

### Langkah 4: Membangun untuk Produksi (*Production Build*)

Untuk memverifikasi bahwa kode bebas dari *type error* TypeScript:

```bash
# Build Backend
cd backend
npm run build

# Build Frontend
cd ../frontend
npm run build
```

---

## 8. Panduan Deployment & Pengumpulan

Sesuai instruksi PRD, aplikasi wajib diunggah dan ditampilkan pada website pribadi mahasiswa:

1. **Deploy Frontend:**
   - Direktori `frontend/` dapat di-deploy secara instan ke platform seperti **Vercel**, **Netlify**, atau **GitHub Pages**.
   - Set Environment Variable pada dashboard hosting frontend:
     `VITE_API_URL=https://nama-backend-anda.vercel.app` (jika backend di-deploy terpisah).
2. **Deploy Backend Next.js:**
   - Direktori `backend/` dapat di-deploy langsung ke **Vercel** atau **Railway**.
3. **Materi Pengumpulan Tugas:**
   - **Tautan Website:** Tautan live demo yang dapat diakses publik.
   - **Tautan Repository GitHub:** Link publik ke repository ini.
   - **Tangkapan Layar (Screenshot):**
     1. Halaman Beranda / Katalog Utama (`/katalog`) dengan filter aktif.
     2. Halaman Detail Buku (`/buku/:id`).
     3. Halaman Catatan & Koleksi (`/catatan`) beserta formulir validasi.
     4. Bukti respons JSON dari Next.js Route Handler (`/api/books`).

---
*Dibuat untuk memenuhi Tugas Mata Kuliah Pemrograman Aplikasi Web (PAW).*
