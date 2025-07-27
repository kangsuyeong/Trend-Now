'use client';

import { cn } from '@/shared/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mypageTabs } from '../const';
import { useQueries } from '@tanstack/react-query';
import { useUserStore } from '@/shared/store';
import { axiosMyPosts, axiosMyScraps } from '@/shared/api';
import { PostsResponse } from '@/entities';

const tabQueries = {
  posts: () => axiosMyPosts<PostsResponse>(),
  comments: () => axiosMyPosts<PostsResponse>(),
  scraps: () => axiosMyScraps<PostsResponse>(),
};

const MyPageTabs = () => {
  const pathname = usePathname().split('/');
  const { memberId } = useUserStore();

  const queryKeys = Object.keys(tabQueries);

  const results = useQueries({
    queries: queryKeys.map((key) => ({
      queryKey: [key, memberId],
      queryFn: tabQueries[key as keyof typeof tabQueries],
    })),
  });

  return (
    <ul className="flex gap-5 px-4">
      {Object.entries(mypageTabs).map((tab, idx) => {
        const href = tab[0];
        const isActive = pathname[pathname.length - 1] === tab[0];

        return (
          <li key={href}>
            <Link
              href={`/mypage/${href}`}
              className={cn(
                'flex items-center gap-2 px-3 pb-2 text-base font-bold transition-colors duration-200',
                isActive ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'
              )}
            >
              <span>{tab[1].label}</span>
              {idx != 3 && (
                <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>
                  {results[idx].data?.postListDto.length}
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
