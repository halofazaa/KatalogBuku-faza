import React from 'react';
import { Compass, Filter, BookHeart, Check } from 'lucide-react';

interface StepperBarProps {
  currentStep: number;
  onSelectStep?: (step: number) => void;
}

export const StepperBar: React.FC<StepperBarProps> = ({ currentStep, onSelectStep }) => {
  const steps = [
    {
      id: 1,
      title: 'Jelajahi Katalog',
      description: 'Pencarian & eksplorasi buku',
      icon: Compass,
    },
    {
      id: 2,
      title: 'Filter & Urutkan',
      description: 'Kategori, tag & relevansi',
      icon: Filter,
    },
    {
      id: 3,
      title: 'Catatan & Koleksi',
      description: 'Jurnal ulasan & favorit',
      icon: BookHeart,
    },
  ];

  return (
    <div className="w-full my-6">
      <div className="bg-white rounded-2xl md:rounded-full p-2 border border-slate-200 shadow-clean flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep && onSelectStep(step.id)}
              className={`flex-1 flex items-center gap-3.5 px-4 py-3 rounded-xl md:rounded-full text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-orange-50/90 border border-orange-200 text-orange-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {/* Number or check badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 tabular-nums transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
              </div>

              {/* Title & Description */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold leading-tight ${isActive ? 'text-orange-950' : 'text-slate-800'}`}>
                    {step.title}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse hidden sm:inline-block"></span>
                  )}
                </div>
                <p className={`text-[11px] truncate leading-tight ${isActive ? 'text-orange-700/80 font-medium' : 'text-slate-400'}`}>
                  {step.description}
                </p>
              </div>

              {/* Step Icon */}
              <step.icon
                className={`w-4 h-4 shrink-0 hidden sm:block ${
                  isActive ? 'text-orange-500' : 'text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
