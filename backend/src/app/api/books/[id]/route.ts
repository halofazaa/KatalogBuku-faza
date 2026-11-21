import { NextRequest, NextResponse } from 'next/server';
import { fetchBookByIdFromApi, fetchBooksFromApi } from '@/lib/externalBookApi';
import { Book } from '@/types/book';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'ID buku diperlukan.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const book = await fetchBookByIdFromApi(id);

    if (!book) {
      return NextResponse.json(
        { error: 'Buku dengan ID tersebut tidak ditemukan.' },
        { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Get related books based on first category
    let relatedBooks: Book[] = [];
    if (book.categories && book.categories.length > 0) {
      const relatedRes = await fetchBooksFromApi({
        category: book.categories[0],
        limit: 4,
      });
      relatedBooks = relatedRes.books.filter(b => b.id !== book.id).slice(0, 3);
    }

    return NextResponse.json(
      { book, relatedBooks },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error(`Error in /api/books/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail buku.' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
