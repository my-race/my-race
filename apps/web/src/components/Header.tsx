'use client';

import { useScrollShadow } from '../hooks/useScrollShadow';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { canScrollUp } = useScrollShadow();

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 ${
        canScrollUp ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]' : ''
      }`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}
