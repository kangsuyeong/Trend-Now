'use client';

import { BookmarkButton, PostKebabButton } from '@/features/post';
import { BOARD_MAP } from '@/shared/constants';
import { PostDetail } from '@/shared/types';
import { Skeleton, UserProfile28 } from '@/shared/ui';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';

export default function Header({ post }: { post?: PostDetail }) {
  const pathname = usePathname(); //  현재 URL 경로를 문자열로 가져옴
  const boardType = pathname.split('/')[1] as keyof typeof BOARD_MAP; // 예: "/free/post/6" → "free"
  const boardName = BOARD_MAP[boardType].name;

  return (
    <div className="flex flex-col gap-y-8 border-b border-gray-200 pb-6">
      <div className="flex justify-between">
        <span className="flex flex-col gap-y-3">
          <span className="text-lg font-semiBold text-gray-500">{boardName}게시판</span>
          {post ? (
            <span className="text-2xl font-bold text-gray-800">{post.title}</span>
          ) : (
            <Skeleton className="h-8" />
          )}
        </span>
        <span className="flex gap-x-2">
          <BookmarkButton />
          <PostKebabButton />
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex items-center gap-x-2">
          <UserProfile28 />
          {post ? (
            <span className="text-base font-medium text-gray-500">{post.writer}</span>
          ) : (
            <Skeleton className="h-4 w-32" />
          )}
        </span>
        <span className="flex items-center text-sm font-regular text-gray-500">
          <span className="flex items-center gap-x-1.5 rounded-md bg-gray-100 px-2.5 py-1">
            <span>댓글</span>
            {post ? (
              <span>{post.commentCount.toLocaleString()}</span>
            ) : (
              <Skeleton className="h-3.5 w-4" />
            )}
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>조회수</span>
            {post ? (
              <span>{post.viewCount.toLocaleString()}</span>
            ) : (
              <Skeleton className="h-3.5 w-4" />
            )}
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>추천</span>
            {post ? (
              <span>{post.likeCount.toLocaleString()}</span>
            ) : (
              <Skeleton className="h-3.5 w-4" />
            )}
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>작성일</span>
            {post ? (
              <span>{dayjs(post.updatedAt).format('YYYY.MM.DD')}</span>
            ) : (
              <Skeleton className="h-3.5 w-4" />
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
