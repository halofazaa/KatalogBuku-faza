import React, { useState } from 'react';
import { X, Plus, Sparkles, Tag } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

interface CategoryChipGroupProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const DEFAULT_CATEGORIES = [
  'Semua',
  'Technology',
  'Programming',
  'Fiction',
  'Philosophy',
  'Design',
  'Self-Improvement',
  'History',
  'Science',
  'Business',
];

export const CategoryChipGroup: React.FC<CategoryChipGroupProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { customTags, addCustomTag, removeCustomTag } = useBookContext();
  const [newTagInput, setNewTagInput] = useState('');
  const [tagError, setTagError] = useState('');

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTagInput.trim();
    if (!trimmed) {
      setTagError('Masukkan nama tag/kategori.');
      return;
    }
    if (trimmed.length < 2) {
      setTagError('Minimal 2 karakter.');
      return;
    }
    if (DEFAULT_CATEGORIES.map(c => c.toLowerCase()).includes(trimmed.toLowerCase())) {
      setTagError('Kategori bawaan sudah tersedia.');
      return;
    }
    if (customTags.map(t => t.toLowerCase()).includes(trimmed.toLowerCase())) {
      setTagError('Tag ini sudah ada.');
      return;
    }

    addCustomTag(trimmed);
    setNewTagInput('');
    setTagError('');
    onSelectCategory(trimmed);
  };

  const handleChipClick = (cat: string) => {
    if (selectedCategory === cat && cat !== 'Semua') {
      onSelectCategory('Semua');
    } else {
      onSelectCategory(cat);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/90 shadow-clean mb-8">
      {/* Header filter & tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Kategori &amp; Tag Populer
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih chip untuk menyaring katalog seketika. Klik tag aktif untuk membatalkan filter.
          </p>
        </div>

        {/* Input Add Custom Tag / Category with Dark Button */}
        <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => {
                setNewTagInput(e.target.value);
                if (tagError) setTagError('');
              }}
              placeholder="Tambah kategori..."
              className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-xs rounded-full border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </form>
      </div>

      {tagError && (
        <p className="text-[11px] text-red-500 font-semibold mt-2 animate-fadeIn">
          {tagError}
        </p>
      )}

      {/* Chip Badges List */}
      <div className="flex flex-wrap items-center gap-2 pt-4">
        {DEFAULT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleChipClick(cat)}
              className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 ring-2 ring-orange-500/30'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 hover:text-slate-900'
              }`}
            >
              <span>{cat}</span>
              {isSelected && cat !== 'Semua' && (
                <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center group-hover:bg-white/40">
                  <X className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          );
        })}

        {/* Custom User Tags */}
        {customTags.map((tag) => {
          const isSelected = selectedCategory.toLowerCase() === tag.toLowerCase();
          return (
            <div
              key={tag}
              className={`inline-flex items-center rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-600/30'
                  : 'bg-orange-50 text-orange-800 border border-orange-200'
              }`}
            >
              <button
                type="button"
                onClick={() => handleChipClick(tag)}
                className="px-3.5 py-1.5 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>{tag}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCustomTag(tag);
                  if (selectedCategory === tag) {
                    onSelectCategory('Semua');
                  }
                }}
                className="pr-2.5 pl-0.5 py-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity"
                title={`Hapus tag ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
