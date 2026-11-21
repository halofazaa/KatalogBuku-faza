'use client';

import dynamic from 'next/dynamic';

const AppRouterWrapper = dynamic(() => import('@/components/AppRouterWrapper'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xs font-semibold text-slate-500">Memuat BookCatalog...</p>
    </div>
  ),
});

export default function ClientApp() {
  return <AppRouterWrapper />;
}
