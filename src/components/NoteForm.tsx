import React, { useState } from 'react';
import { Star, CheckCircle, AlertCircle, Sparkles, Send, BookCheck } from 'lucide-react';
import { NoteFormErrors, NoteFormState, ReadingStatus } from '../types/book';
import { useBookContext } from '../context/BookContext';

interface NoteFormProps {
  initialBookTitle?: string;
  initialBookId?: string;
  initialAuthor?: string;
  onSuccess?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  initialBookTitle = '',
  initialBookId = '',
  initialAuthor = '',
  onSuccess,
}) => {
  const { addNote } = useBookContext();

  const [formData, setFormData] = useState<NoteFormState>({
    bookId: initialBookId || 'custom-book',
    bookTitle: initialBookTitle || '',
    authorName: initialAuthor || '',
    noteTitle: '',
    content: '',
    rating: 5,
    status: 'completed',
    tags: 'Catatan, Referensi',
    publishedYear: new Date().getFullYear().toString(),
  });

  const [errors, setErrors] = useState<NoteFormErrors>({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Validasi seluruh input formulir
  const validate = (): boolean => {
    const newErrors: NoteFormErrors = {};

    // 1. Validasi Judul Buku
    if (!formData.bookTitle.trim()) {
      newErrors.bookTitle = 'Judul buku wajib diisi.';
    } else if (formData.bookTitle.trim().length < 2) {
      newErrors.bookTitle = 'Judul buku minimal 2 karakter.';
    }

    // 2. Validasi Nama Penulis / Reviewer
    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Nama penulis wajib diisi.';
    } else if (formData.authorName.trim().length < 2) {
      newErrors.authorName = 'Nama penulis minimal 2 karakter.';
    }

    // 3. Validasi Judul Catatan
    if (!formData.noteTitle.trim()) {
      newErrors.noteTitle = 'Judul catatan/topik bahasan wajib diisi.';
    } else if (formData.noteTitle.trim().length < 4) {
      newErrors.noteTitle = 'Judul catatan minimal 4 karakter.';
    }

    // 4. Validasi Isi Catatan (minimal 15 karakter)
    if (!formData.content.trim()) {
      newErrors.content = 'Isi catatan bacaan wajib diisi.';
    } else if (formData.content.trim().length < 15) {
      newErrors.content = `Isi ulasan minimal 15 karakter (saat ini: ${formData.content.trim().length} karakter).`;
    }

    // 5. Validasi Rating
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating harus berupa angka antara 1 sampai 5.';
    }

    // 6. Validasi Tahun Terbit
    if (formData.publishedYear) {
      const yearNum = parseInt(formData.publishedYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1800 || yearNum > currentYear + 1) {
        newErrors.publishedYear = `Tahun terbit harus antara 1800 dan ${currentYear + 1}.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));

    // Hapus error field saat user mengetik
    if (errors[name as keyof NoteFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Parse tags array
    const parsedTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const yearNum = formData.publishedYear ? parseInt(formData.publishedYear, 10) : undefined;

    // Tambahkan catatan ke Global Context
    addNote({
      bookId: formData.bookId || `custom-${Date.now()}`,
      bookTitle: formData.bookTitle.trim(),
      authorName: formData.authorName.trim(),
      noteTitle: formData.noteTitle.trim(),
      content: formData.content.trim(),
      rating: formData.rating,
      status: formData.status as ReadingStatus,
      tags: parsedTags.length > 0 ? parsedTags : ['Umum'],
      publishedYear: yearNum,
    });

    setIsSubmittedSuccess(true);

    // Reset formulir
    setFormData({
      bookId: '',
      bookTitle: '',
      authorName: '',
      noteTitle: '',
      content: '',
      rating: 5,
      status: 'completed',
      tags: 'Catatan, Referensi',
      publishedYear: new Date().getFullYear().toString(),
    });

    setTimeout(() => {
      setIsSubmittedSuccess(false);
      if (onSuccess) onSuccess();
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-clean relative">
      
      {/* Form Header */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <BookCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Formulir Catatan &amp; Ulasan Bacaan
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Controlled component dengan validasi TypeScript interaktif
            </p>
          </div>
        </div>

        <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-orange-100 text-orange-800 border border-orange-200">
          Form Validated
        </span>
      </div>

      {/* Success Notification Alert */}
      {isSubmittedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs font-semibold">
            <strong>Berhasil disimpan!</strong> Catatan bacaan Anda telah ditambahkan ke Global State dan tersimpan di penyimpanan lokal browser.
          </div>
        </div>
      )}

      {/* Actual Controlled Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        
        {/* Row 1: Judul Buku & Penulis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Judul Buku <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="Contoh: Clean Code"
              className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
                errors.bookTitle
                  ? 'border-red-400 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
              }`}
            />
            {errors.bookTitle && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.bookTitle}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Nama Penulis <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Contoh: Robert C. Martin"
              className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
                errors.authorName
                  ? 'border-red-400 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
              }`}
            />
            {errors.authorName && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.authorName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Judul Catatan / Topik & Status Baca */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Judul Catatan / Topik Bahasan <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="noteTitle"
              value={formData.noteTitle}
              onChange={handleChange}
              placeholder="Contoh: Ringkasan Pola Refactoring & SRP"
              className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
                errors.noteTitle
                  ? 'border-red-400 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
              }`}
            />
            {errors.noteTitle && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.noteTitle}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Status Bacaan
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-semibold"
            >
              <option value="completed">Selesai Dibaca</option>
              <option value="reading">Sedang Dibaca</option>
              <option value="want-to-read">Ingin Dibaca</option>
            </select>
          </div>
        </div>

        {/* Row 3: Rating (1-5), Tahun Terbit, Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Rating Penilaian (1–5) <span className="text-orange-500">*</span>
            </label>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, rating: star }));
                    if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
                  }}
                  className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`Rating ${star}`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2 tabular-nums">
                {formData.rating} / 5
              </span>
            </div>
            {errors.rating && (
              <p className="text-[11px] font-semibold text-red-500 mt-1">
                {errors.rating}
              </p>
            )}
          </div>

          {/* Tahun Terbit */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Tahun Terbit (Opsional)
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="Contoh: 2024"
              className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium tabular-nums transition-all ${
                errors.publishedYear
                  ? 'border-red-400 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
              }`}
            />
            {errors.publishedYear && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.publishedYear}</span>
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Tag / Label (Pisahkan Koma)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Arsitektur, Kuliah, Skripsi"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
            />
          </div>

        </div>

        {/* Row 4: Isi Catatan (Textarea) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Isi Catatan &amp; Ulasan <span className="text-orange-500">*</span>
            </label>
            <span
              className={`text-[11px] font-bold tabular-nums ${
                formData.content.trim().length >= 15 ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {formData.content.trim().length} / 15 karakter minimum
            </span>
          </div>
          <textarea
            rows={4}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Tuliskan intisari penting, kutipan berkesan, atau ulasan analitis Anda mengenai buku ini (minimal 15 karakter)..."
            className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium leading-relaxed transition-all ${
              errors.content
                ? 'border-red-400 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-400/20'
                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500'
            }`}
          />
          {errors.content && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.content}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Kolom bertanda <span className="text-orange-500 font-bold">*</span> wajib diisi dengan benar.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 active:scale-95 shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Catatan Bacaan</span>
          </button>
        </div>

      </form>
    </div>
  );
};
