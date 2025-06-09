'use client';

import { cn } from '@/shared/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: '내가 작성한 게시글', path: '/mypage/posts', count: 31 },
  { name: '내가 작성한 댓글', path: '/mypage/comments', count: 16 },
  { name: '스크랩한 게시글', path: '/mypage/scraps', count: 4 },
  { name: '설정', path: '/mypage/settings' },
];

const MyPageTabs = () => {
  const pathname = usePathname();
  return (
    <ul className="flex gap-5 px-4">
      {tabs.map((tab) => {
        const href = tab.path;
        const isActive = pathname.startsWith(href);

        return (
          <li key={tab.name}>
            <Link
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 pb-2 text-base font-bold transition-colors duration-200',
                isActive ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'
              )}
            >
              <span>{tab.name}</span>
              {tab.count !== undefined && (
                <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>
                  {tab.count}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MyPageTabs;

// transition-colors duration-200
