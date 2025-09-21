'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

export const useScrollShadow = (scrollContainerRef?: RefObject<HTMLDivElement>) => {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);

  // 외부에서 ref를 제공하면 그것을 사용, 아니면 내부 ref 사용
  const targetRef = scrollContainerRef || internalRef;

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = targetRef.current;
      console.log('handleScroll called, scrollContainer:', scrollContainer);

      if (!scrollContainer) {
        console.log('No scroll container found');
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      console.log('Scroll values:', { scrollTop, scrollHeight, clientHeight });

      // 위로 스크롤 가능한지 (스크롤이 맨 위가 아님)
      const newCanScrollUp = scrollTop > 0;

      // 아래로 스크롤 가능한지 (스크롤이 맨 아래가 아님)
      const newCanScrollDown = scrollTop + clientHeight < scrollHeight - 1;

      console.log('Scroll states:', { newCanScrollUp, newCanScrollDown });

      setCanScrollUp(newCanScrollUp);
      setCanScrollDown(newCanScrollDown);
    };

    const scrollContainer = targetRef.current;
    console.log('Setting up scroll listener, container:', scrollContainer);

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // 초기 상태 확인
      handleScroll();

      return () => {
        console.log('Cleaning up scroll listener');
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    } else {
      console.log('No scroll container to attach listener to');
    }
  }, [targetRef]);

  return { canScrollUp, canScrollDown, scrollRef: internalRef };
};