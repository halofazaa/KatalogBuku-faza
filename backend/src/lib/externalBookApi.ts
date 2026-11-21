import { Book, BooksResponse } from '../types/book';

// Curated high-quality books as robust offline/fallback data
export const FALLBACK_BOOKS: Book[] = [
  {
    id: "clean-code-01",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    authors: ["Robert C. Martin"],
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.",
    publisher: "Prentice Hall",
    publishedDate: "2008-08-01",
    publishedYear: 2008,
    pageCount: 464,
    categories: ["Technology", "Programming"],
    thumbnail: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.7,
    ratingsCount: 3840,
    previewLink: "https://books.google.com",
    isbn: "9780132350884"
  },
  {
    id: "pragmatic-programmer-02",
    title: "The Pragmatic Programmer: Your Journey To Mastery",
    authors: ["David Thomas", "Andrew Hunt"],
    description: "The Pragmatic Programmer is one of those rare tech audiobooks you'll listen to, read, and listen to again over the years. Whether you're new to the field or an experienced practitioner, you'll come away each time with fresh insights.",
    publisher: "Addison-Wesley Professional",
    publishedDate: "2019-09-13",
    publishedYear: 2019,
    pageCount: 352,
    categories: ["Technology", "Programming"],
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.8,
    ratingsCount: 4210,
    previewLink: "https://books.google.com",
    isbn: "9780135957059"
  },
  {
    id: "designing-data-intensive-03",
    title: "Designing Data-Intensive Applications",
    authors: ["Martin Kleppmann"],
    description: "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In addition, we have an overwhelming variety of tools.",
    publisher: "O'Reilly Media",
    publishedDate: "2017-03-16",
    publishedYear: 2017,
    pageCount: 616,
    categories: ["Technology", "Data Science"],
    thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.9,
    ratingsCount: 5120,
    previewLink: "https://books.google.com",
    isbn: "9781449373320"
  },
  {
    id: "bumi-manusia-04",
    title: "Bumi Manusia (This Earth of Mankind)",
    authors: ["Pramoedya Ananta Toer"],
    description: "Bumi Manusia adalah buku pertama dari Tetralogi Buru karya Pramoedya Ananta Toer. Diterbitkan pertama kali pada tahun 1980, novel ini mengisahkan perjalanan hidup Minke, seorang pribumi cerdas di era kolonial Hindia Belanda.",
    publisher: "Lentera Dipantara",
    publishedDate: "2005-01-01",
    publishedYear: 2005,
    pageCount: 535,
    categories: ["Fiction", "History", "Literature"],
    thumbnail: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&auto=format&fit=crop&q=80",
    language: "id",
    averageRating: 4.8,
    ratingsCount: 6200,
    previewLink: "https://books.google.com",
    isbn: "9789799731234"
  },
  {
    id: "laskar-pelangi-05",
    title: "Laskar Pelangi",
    authors: ["Andrea Hirata"],
    description: "Kisah inspiratif tentang sepuluh anak dari keluarga miskin di Pulau Belitung yang berjuang mendapatkan pendidikan layak di sekolah dasar Muhammadiyah yang serba kekurangan di bawah asuhan Ibu Muslimah.",
    publisher: "Bentang Pustaka",
    publishedDate: "2005-09-01",
    publishedYear: 2005,
    pageCount: 529,
    categories: ["Fiction", "Inspiration"],
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80",
    language: "id",
    averageRating: 4.6,
    ratingsCount: 8430,
    previewLink: "https://books.google.com",
    isbn: "9789793062792"
  },
  {
    id: "sapiens-06",
    title: "Sapiens: A Brief History of Humankind",
    authors: ["Yuval Noah Harari"],
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be human.",
    publisher: "Harper",
    publishedDate: "2015-02-10",
    publishedYear: 2015,
    pageCount: 464,
    categories: ["History", "Science", "Anthropology"],
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.7,
    ratingsCount: 9340,
    previewLink: "https://books.google.com",
    isbn: "9780062316097"
  },
  {
    id: "atomic-habits-07",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    authors: ["James Clear"],
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master tiny behaviors.",
    publisher: "Avery",
    publishedDate: "2018-10-16",
    publishedYear: 2018,
    pageCount: 320,
    categories: ["Self-Improvement", "Business", "Psychology"],
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.9,
    ratingsCount: 15400,
    previewLink: "https://books.google.com",
    isbn: "9780735211292"
  },
  {
    id: "design-of-everyday-things-08",
    title: "The Design of Everyday Things: Revised and Expanded Edition",
    authors: ["Don Norman"],
    description: "Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The Design of Everyday Things shows that usable, delightful design is possible.",
    publisher: "Basic Books",
    publishedDate: "2013-11-05",
    publishedYear: 2013,
    pageCount: 368,
    categories: ["Design", "Technology", "Psychology"],
    thumbnail: "https://images.unsplash.com/photo-1507842229451-7f01be7fe0ab?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.6,
    ratingsCount: 2980,
    previewLink: "https://books.google.com",
    isbn: "9780465050659"
  },
  {
    id: "filosofi-teras-09",
    title: "Filosofi Teras: Filsafat Yunani-Romawi Kuno untuk Mental Tangguh",
    authors: ["Henry Manampiring"],
    description: "Lebih dari 2.000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan juga solusi dari banyak emosi negatif. Stoisisme, atau Filosofi Teras, adalah filsafat Yunani-Romawi kuno yang bisa membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh.",
    publisher: "Kompas Gramedia",
    publishedDate: "2019-01-01",
    publishedYear: 2019,
    pageCount: 346,
    categories: ["Philosophy", "Self-Improvement"],
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80",
    language: "id",
    averageRating: 4.8,
    ratingsCount: 7100,
    previewLink: "https://books.google.com",
    isbn: "9786024125189"
  },
  {
    id: "refactoring-ui-10",
    title: "Refactoring UI: Make Your Ideas Look Professional",
    authors: ["Adam Wathan", "Steve Schoger"],
    description: "Design with confidence. Refactoring UI takes the lessons learned from building Tailwind CSS and real-world interfaces, breaking design down into actionable tactics developers can use to create beautiful user interfaces without a design background.",
    publisher: "Refactoring UI LLC",
    publishedDate: "2018-12-11",
    publishedYear: 2018,
    pageCount: 252,
    categories: ["Design", "Technology"],
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.9,
    ratingsCount: 2150,
    previewLink: "https://books.google.com",
    isbn: "9781732958005"
  },
  {
    id: "deep-work-11",
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    authors: ["Cal Newport"],
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time. Deep work will make you better at what you do.",
    publisher: "Grand Central Publishing",
    publishedDate: "2016-01-05",
    publishedYear: 2016,
    pageCount: 304,
    categories: ["Self-Improvement", "Business"],
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.5,
    ratingsCount: 4620,
    previewLink: "https://books.google.com",
    isbn: "9781455586691"
  },
  {
    id: "cant-hurt-me-12",
    title: "Can't Hurt Me: Master Your Mind and Defy the Odds",
    authors: ["David Goggins"],
    description: "For David Goggins, childhood was a nightmare - poverty, prejudice, and physical abuse colored his days and haunted his nights. But through self-discipline, mental toughness, and hard work, Goggins transformed himself from a depressed, overweight young man into a U.S. Armed Forces icon.",
    publisher: "Lioncrest Publishing",
    publishedDate: "2018-12-04",
    publishedYear: 2018,
    pageCount: 364,
    categories: ["Biography", "Self-Improvement"],
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop&q=80",
    language: "en",
    averageRating: 4.8,
    ratingsCount: 8900,
    previewLink: "https://books.google.com",
    isbn: "9781544512280"
  }
];

function normalizeGoogleBook(item: any): Book {
  const info = item.volumeInfo || {};
  const publishedDate = info.publishedDate || '';
  let publishedYear: number | undefined;
  if (publishedDate) {
    const match = publishedDate.match(/\b\d{4}\b/);
    if (match) publishedYear = parseInt(match[0], 10);
  }

  // Cover image fallback
  let thumbnail = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
  if (thumbnail && thumbnail.startsWith('http://')) {
    thumbnail = thumbnail.replace('http://', 'https://');
  }
  if (!thumbnail) {
    thumbnail = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80';
  }

  const categories = Array.isArray(info.categories) && info.categories.length > 0
    ? info.categories.flatMap((c: string) => c.split('/').map(s => s.trim()))
    : ['General'];

  return {
    id: item.id || Math.random().toString(36).substring(2, 9),
    title: info.title || 'Untitled Book',
    authors: Array.isArray(info.authors) && info.authors.length > 0 ? info.authors : ['Unknown Author'],
    description: info.description || 'Tidak ada deskripsi detail yang tersedia untuk buku ini.',
    publisher: info.publisher || 'Penerbit Umum',
    publishedDate,
    publishedYear,
    pageCount: info.pageCount || 0,
    categories: Array.from(new Set(categories)),
    thumbnail,
    language: info.language || 'id',
    averageRating: info.averageRating || 4.5,
    ratingsCount: info.ratingsCount || 0,
    previewLink: info.previewLink,
    infoLink: info.infoLink,
    isbn: info.industryIdentifiers?.[0]?.identifier
  };
}

export interface FetchBooksOptions {
  query?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchBooksFromApi(options: FetchBooksOptions): Promise<BooksResponse> {
  const q = options.query?.trim() || '';
  const category = options.category?.trim() || '';
  const sort = options.sort || 'relevance';
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, Math.min(40, options.limit || 12));
  const startIndex = (page - 1) * limit;

  let books: Book[] = [];
  let totalItems = 0;

  try {
    // Build search query for Google Books
    let apiQuery = q;
    if (!apiQuery) {
      apiQuery = category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'semua'
        ? `subject:${category}`
        : 'programming OR literature OR design';
    } else if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'semua') {
      apiQuery = `${apiQuery} subject:${category}`;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(apiQuery)}&startIndex=${startIndex}&maxResults=${limit}&printType=books`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      totalItems = data.totalItems || 0;
      if (Array.isArray(data.items)) {
        books = data.items.map(normalizeGoogleBook);
      }
    }
  } catch (err) {
    // Graceful fallback if network is restricted or offline
    console.warn('External API call failed, using fallback repository:', err);
  }

  // If external API returned no books or failed, use curated local fallback
  if (books.length === 0) {
    let filtered = [...FALLBACK_BOOKS];

    if (q) {
      const lowerQ = q.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(lowerQ) ||
        b.authors.some(a => a.toLowerCase().includes(lowerQ)) ||
        b.description.toLowerCase().includes(lowerQ)
      );
    }

    if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'semua') {
      const lowerCat = category.toLowerCase();
      filtered = filtered.filter(b =>
        b.categories.some(c => c.toLowerCase().includes(lowerCat))
      );
    }

    totalItems = filtered.length;
    books = filtered.slice(startIndex, startIndex + limit);
  }

  // Client-side/Server-side sorting
  if (sort === 'title_asc') {
    books.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'title_desc') {
    books.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'year_desc') {
    books.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
  } else if (sort === 'year_asc') {
    books.sort((a, b) => (a.publishedYear || 0) - (b.publishedYear || 0));
  } else if (sort === 'rating_desc') {
    books.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  }

  const totalPages = Math.ceil(totalItems / limit) || 1;

  return {
    books,
    totalItems,
    page,
    limit,
    totalPages,
    query: q,
    category,
    sort
  };
}

export async function fetchBookByIdFromApi(id: string): Promise<Book | null> {
  // Check fallback first for instant hit
  const foundInFallback = FALLBACK_BOOKS.find(b => b.id === id);
  if (foundInFallback) {
    return foundInFallback;
  }

  try {
    const url = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return normalizeGoogleBook(data);
    }
  } catch (err) {
    console.warn(`Failed to fetch book ${id} from external API:`, err);
  }

  // Fallback to first book or null
  return FALLBACK_BOOKS.find(b => b.id.toLowerCase().includes(id.toLowerCase())) || null;
}
