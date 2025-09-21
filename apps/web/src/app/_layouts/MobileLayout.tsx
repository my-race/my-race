"use client";

import BottomTabNavigation from "../../components/navigation/BottomTabNavigation";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md relative">
        {/* 메인 콘텐츠 영역 */}
        <main className="pb-20 h-screen">
          {children}
        </main>

        {/* 바텀 탭 네비게이션 */}
        <BottomTabNavigation />
      </div>
    </div>
  );
}
