'use client';

import { motion } from 'framer-motion';
import { Flag, Info, User, Users, LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useScrollStore } from '../../app/_stores/useScrollStore';

interface TabItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  {
    id: 'races',
    label: '대회 목록',
    path: '/races',
    icon: Flag,
  },
  {
    id: 'tips',
    label: '러닝 꿀팁',
    path: '/tips',
    icon: Info,
  },
  {
    id: 'community',
    label: '커뮤니티',
    path: '/community',
    icon: Users,
  },
  {
    id: 'my',
    label: '마이',
    path: '/my',
    icon: User,
  },
];

export default function BottomTabNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { canScrollDown, setCanScrollUp, setCanScrollDown } = useScrollStore();

  const handleTabPress = (path: string) => {
    // 탭 변경 시 스크롤 상태 리셋
    setCanScrollUp(false);
    setCanScrollDown(false);
    router.push(path);
  };

  return (
    <nav
      className={`absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 transition-shadow duration-300 ${
        canScrollDown ? 'shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' : ''
      }`}
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <ul className="flex justify-around items-center py-2 px-4">
        {tabs.map(tab => {
          const { id, label, path, icon } = tab;
          const isActive =
            pathname === path ||
            (path !== '/' && path !== '/races' && pathname.startsWith(path));

          const Icon = icon;

          return (
            <li key={id} className="flex-1">
              <motion.button
                onClick={() => handleTabPress(path)}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-0 w-full"
                whileTap={{ scale: 0.95 }}
                initial={false}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`${label} 탭`}
              >
                <motion.div
                  className={`${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  } transition-colors duration-200`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <motion.span
                  className={`text-xs mt-1 ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
                  } transition-colors duration-200`}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    fontWeight: isActive ? 500 : 400,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
