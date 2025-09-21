'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../../app/_stores/useScrollStore';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setCanScrollUp, setCanScrollDown } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // 위로 스크롤 가능한지 (스크롤이 맨 위가 아님)
      setCanScrollUp(scrollTop > 0);

      // 아래로 스크롤 가능한지 (스크롤이 맨 아래가 아님)
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // 초기 상태 확인
      handleScroll();

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [setCanScrollUp, setCanScrollDown]);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto scrollbar-hide" style={{ scrollSnapType: 'y proximity' }}>
      <div className="p-4">{children}</div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
