# 📚 BookCatalog — Aplikasi Web Katalog Buku Interaktif
> **Proyek Tugas Pemrograman Aplikasi Web (PAW)**  
> **Arsitektur:** Single Fullstack Next.js Project (Next.js App Router API Handlers + React Router Client-Side + TypeScript)  
> **Desain UI:** (*Clean, Airy, Card-based*), Palet Aksen Oranye, dan Tipografi Manrope (*Tabular Numbers*).
<img width="1127" height="762" alt="Screenshot 2026-11-21 131021" src="https://github.com/user-attachments/assets/1527141d-68a0-4a5f-9aab-cb9fd96dc768" />
<img width="1138" height="861" alt="Screenshot 2026-11-21 131033" src="https://github.com/user-attachments/assets/41aa1d9a-3b27-4013-9bc0-46a0431d6ac9" />
<img width="1186" height="702" alt="Screenshot 2026-11-21 131045" src="https://github.com/user-attachments/assets/0f109144-8148-4f0c-8be5-427f047d4afc" />
<img width="1105" height="822" alt="Screenshot 2026-11-21 131138" src="https://github.com/user-attachments/assets/c5ba248b-9b01-47f1-a9d7-3a1ef14dd77e" />




---

## 📑 Daftar Isi
1. [Ringkasan Proyek & Tujuan](#1-ringkasan-proyek--tujuan)
2. [Sistem Desain UI (Aksen Oranye)](#2-sistem-desain-ui)
3. [Arsitektur & Struktur Folder Monorepo](#3-arsitektur--struktur-folder-monorepo)
4. [Kebutuhan Fungsional & Fitur Utama](#4-kebutuhan-fungsional--fitur-utama)
5. [Implementasi 5 Jenis State Management](#5-implementasi-5-jenis-state-management)
6. [Spesifikasi Backend API (Next.js Route Handlers)](#6-spesifikasi-backend-api-nextjs-route-handlers)
7. [Panduan Instalasi & Menjalankan Aplikasi](#7-panduan-instalasi--menjalankan-aplikasi)
8. [Panduan Deployment Vercel (1-Click Instant Deploy)](#8-panduan-deployment-vercel-1-click-instant-deploy)

---

## 1. Ringkasan Proyek & Tujuan

**BookCatalog** adalah aplikasi katalog buku modern dan interaktif yang dibangun sebagai **satu kesatuan proyek Next.js tunggal (*Single Project*)**. 
Arsitektur ini memadukan:
1. **Frontend React dengan React Router:** Pengalaman pengguna yang responsif (*Client-Side Routing*, *Nested Routes*, *Dynamic Routes*) tanpa *reload* halaman penuh.
2. **Backend Next.js Route Handlers (`src/app/api/books/...`):** Berfungsi sebagai API *proxy* dan *aggregator* yang mengambil data dari public API (Google Books API), memfilter, mengurutkan, menormalisasi data, serta menyediakan *fallback repository* mandiri.
3. **Kemudahan Deployment:** Berjalan dalam satu domain, satu port, tanpa masalah CORS, dan otomatis dikenali sebagai **Next.js** saat di-deploy ke Vercel.

---

## 2. Sistem Desain UI

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

## 3. Arsitektur & Struktur Folder Proyek

Semua modul berada di dalam satu proyek rapi di bawah folder `src/`:

```plaintext
book-catalog-app/
├── package.json                      # Konfigurasi dependensi tunggal
├── tsconfig.json                     # Konfigurasi TypeScript & path alias (@/*)
├── next.config.mjs                   # Konfigurasi Next.js
├── tailwind.config.js                # Konfigurasi tema warna & typography
├── postcss.config.js
├── README.md                         # Dokumentasi teknis lengkap
└── src/
    ├── app/
    │   ├── api/
    │   │   └── books/
    │   │       ├── route.ts          # GET /api/books (search, filter, sort, pagination)
    │   │       └── [id]/
    │   │           └── route.ts      # GET /api/books/[id] (detail lengkap & related books)
    │   ├── [[...slug]]/
    │   │   ├── page.tsx              # Catch-all page Next.js untuk React Router
    │   │   └── ClientApp.tsx         # Client component loader
    │   ├── layout.tsx                # Root layout HTML & Font Manrope
    │   └── globals.css               # Styling global, tema oranye & tabular-nums
    ├── components/
    │   ├── AppRouterWrapper.tsx      # Pembungkus React Router (<BrowserRouter>)
    │   ├── Navbar.tsx                # Header dengan kapsul navigasi oranye
    │   ├── HeroHeader.tsx            # Badge oranye, judul, & kartu status kanan
    │   ├── StepperBar.tsx            # Bilah 3 langkah bernomor
    │   ├── CategoryChipGroup.tsx     # Pilihan chip kategori + input kustom
    │   ├── BookCard.tsx              # Kartu buku bergaya clean rounded-3xl
    │   ├── Pagination.tsx            # Navigasi halaman tabular-nums
    │   └── NoteForm.tsx              # Formulir controlled + validasi ketat
    ├── views/                        # Halaman Aplikasi (React Router)
    │   ├── CatalogPage.tsx           # Halaman utama katalog (/katalog)
    │   ├── BookDetailPage.tsx        # Halaman dynamic route (/buku/:id)
    │   └── NotesPage.tsx             # Halaman catatan lokal (/catatan)
    ├── layouts/
    │   └── MainLayout.tsx            # Nested route layout (<Outlet />)
    ├── hooks/                        # Custom Hooks
    │   ├── useBooks.ts               # Fetch server state + loading/error/empty
    │   └── useDebounce.ts            # Debounce input pencarian
    ├── services/                     # Akses HTTP ke Endpoint API
    │   └── bookService.ts            # Service layer API
    ├── context/                      # Context API Global State
    │   └── BookContext.tsx           # Manajemen catatan, favorit, & custom tags
    ├── types/                        # Definisi Interface & Type TypeScript
    │   └── book.ts
    └── lib/
        └── externalBookApi.ts        # Integrasi Google Books API + Curated Fallback
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
| **URL State** | Menyinkronkan parameter pencarian, filter, sort, dan pagination ke URL query string. | `useSearchParams` pada `src/views/CatalogPage.tsx` (`?q=clean&category=Technology&sort=year_desc&page=1`), sehingga URL dapat dibagikan (*shareable*) atau di-refresh tanpa kehilangan filter. |
| **Form State** | Mengontrol nilai input form dan error validasi terstruktur dengan TypeScript. | `src/components/NoteForm.tsx` dengan tipe `NoteFormState` dan `NoteFormErrors` untuk mengontrol controlled inputs dan menampilkan inline error messages. |

---

## 6. Spesifikasi Backend API (Next.js Route Handlers)

### 1. `GET /api/books`
- **Query Parameters:**
  - `q` *(opsional)*: Kata kunci pencarian (judul, penulis, atau kata kunci).
  - `category` *(opsional)*: Filter kategori buku (misal: `Technology`, `Fiction`).
  - `sort` *(opsional)*: `relevance` | `title_asc` | `title_desc` | `year_desc` | `year_asc` | `rating_desc`.
  - `page` *(opsional, default: 1)*: Nomor halaman.
  - `limit` *(opsional, default: 12)*: Jumlah buku per halaman.

### 2. `GET /api/books/[id]`
- **URL Parameter:** `id` (ID unik buku). Mengembalikan detail lengkap beserta buku terkait (*related books*).

---

## 7. Panduan Instalasi & Menjalankan Aplikasi di Lokal

### Langkah 1: Kloning Repository
```bash
git clone https://github.com/halofazaa/KatalogBuku-faza.git
cd "KatalogBuku-faza"
```

### Langkah 2: Menginstal Dependensi
```cmd
npm install
```

### Langkah 3: Menjalankan Server Pengembangan (*Development*)
```cmd
npm run dev
```
Buka browser di: **[http://localhost:3000](http://localhost:3000)**  
Endpoint API aktif di: **[http://localhost:3000/api/books](http://localhost:3000/api/books)**

### Langkah 4: Uji Build Produksi
```cmd
npm run build
```

---

## 8. Panduan Deployment Vercel (1-Click Instant Deploy)

Karena proyek sekarang adalah **Single Next.js Project**:
1. Buka dashboard [Vercel](https://vercel.com).
2. Klik **Add New...** &rarr; **Project**.
3. Pilih repository `KatalogBuku-faza`.
4. Vercel akan otomatis mengenali:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
5. Langsung klik **Deploy** tanpa perlu mengubah konfigurasi apapun!
6. Selesai! Web langsung online dalam hitungan detik.

---
*Dibuat untuk memenuhi Tugas Mata Kuliah Pemrograman Aplikasi Web (PAW).*
