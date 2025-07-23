'use client';

import { cn } from '@/shared/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mypageTabs } from '../const';
import { useQueries } from '@tanstack/react-query';
import { useUserStore } from '@/shared/store';
import { axiosMyPosts, axiosMyScraps } from '@/shared/api';
import { PostsResponse } from '@/entities';

const MyPageTabs = () => {
  const pathname = usePathname().split('/');
  const { memberId } = useUserStore();

  const results = useQueries({
    queries: [
      {
        queryKey: ['myposts', memberId],
        queryFn: () => axiosMyPosts<PostsResponse>(),
      },
      {
        queryKey: ['mycomments', memberId],
        queryFn: () => axiosMyPosts<PostsResponse>(),
      },
      {
        queryKey: ['myscraps', memberId],
        queryFn: () => axiosMyScraps<PostsResponse>(),
      },
    ],
  });

  return (
    <ul className="flex gap-5 px-4">
      {Object.entries(mypageTabs).map((tab) => {
        const href = tab[0];
        const isActive = pathname[pathname.length - 1] === tab[0];

        return (
          <li key={tab[1].label}>
            <Link
              href={`/mypage/${href}`}
              className={cn(
                'flex items-center gap-2 px-3 pb-2 text-base font-bold transition-colors duration-200',
                isActive ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'
              )}
            >
              <span>{tab[1].label}</span>
              {tab[0] === 'posts'
                ? !results[0].isLoading && (
                    <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>
                      {results[0].data?.postListDto.length}
                    </span>
                  )
                : tab[0] === 'comments'
                  ? !results[1].isLoading && (
                      <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>
                        {results[1].data?.postListDto.length}
                      </span>
                    )
                  : tab[0] === 'scraps'
                    ? !results[2].isLoading && (
                        <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>
                          {results[2].data?.postListDto.length}
                        </span>
                      )
                    : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MyPageTabs;
