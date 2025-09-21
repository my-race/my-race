'use client';

import { useScrollStore } from '../../app/_stores/useScrollStore';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const { canScrollUp } = useScrollStore();

  return (
    <header
      className={`sticky top-0 z-40 px-4 py-6 bg-white border-b border-gray-100 transition-shadow duration-300 ${
        canScrollUp ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]' : ''
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </header>
  );
}
