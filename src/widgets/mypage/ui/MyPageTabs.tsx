'use client';

import { cn } from '@/shared/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mypageTabs } from '../const';
import { useQuery } from '@tanstack/react-query';
import { axiosMyComments, axiosMyPosts, axiosMyScraps } from '@/shared/api';
import { MyCommentsResponse, MyPostsResponse } from '@/shared/types';

const MyPageTabs = () => {
  const pathname = usePathname().split('/');
  const currentTab = pathname[pathname.length - 1];

  const { data: postsLength } = useQuery({
    queryKey: ['myposts', 1],
    queryFn: () => axiosMyPosts<MyPostsResponse>(),
    select: (data) => data.totalCount,
  });

  const { data: commentsData } = useQuery({
    queryKey: ['mycomments', 1],
    queryFn: () => axiosMyComments<MyCommentsResponse>(),
    select: (data) => data.totalCount,
  });

  const { data: scrapsData } = useQuery({
    queryKey: ['myscraps', 1],
    queryFn: () => axiosMyScraps<MyPostsResponse>(),
    select: (data) => data.totalCount,
  });

  const counts = {
    posts: postsLength || 0,
    comments: commentsData || 0,
    scraps: scrapsData || 0,
  };

  return (
    <ul className="flex gap-5 px-4">
      {Object.entries(mypageTabs).map(([key, tab]) => {
        const count = counts[key as keyof typeof counts];

        return (
          <li key={key}>
            <Link
              href={`/mypage/${key}`}
              className={cn(
                'flex items-center gap-2 px-3 pb-2 text-base font-bold transition-colors duration-200',
                currentTab === key ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'
              )}
            >
              <span>{tab.label}</span>
              {key !== 'settings' && (
                <span
                  className={cn(
                    currentTab === key
                      ? count > 0
                        ? 'text-brand-500'
                        : 'text-gray-500'
                      : 'text-gray-400',
                    'transition-colors duration-200'
                  )}
                >
                  {count}
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
