'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './_hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/races');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">리다이렉트 중...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Race</h1>
        <p className="text-gray-600 mb-8">마라톤 대회 정보를 한눈에</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          로그인하고 시작하기
        </button>
      </div>
    </div>
  );
}
