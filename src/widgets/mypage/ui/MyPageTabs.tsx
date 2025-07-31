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
    queryKey: ['myposts'],
    queryFn: () => axiosMyPosts<MyPostsResponse>(),
    select: (data) => data.postListDto.length,
  });

  const { data: commentsData } = useQuery({
    queryKey: ['mycomments'],
    queryFn: () => axiosMyComments<MyCommentsResponse>(),
    select: (data) => data.commentsInfoListDto.length,
  });

  const { data: scrapsData } = useQuery({
    queryKey: ['myscraps'],
    queryFn: () => axiosMyScraps<MyPostsResponse>(),
    select: (data) => data.postListDto.length,
  });

  return (
    <ul className="flex gap-5 px-4">
      {Object.entries(mypageTabs).map(([key, tab]) => (
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
              <span className={cn(currentTab === key ? 'text-brand-500' : 'text-gray-400')}>
                {key === 'posts' ? postsLength : key === 'comments' ? commentsData : scrapsData}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyPageTabs;
