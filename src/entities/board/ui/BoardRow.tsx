'use client';
import { PostInfo } from '@/shared/types';
import React from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { BadgeButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';

const rowVariants = cva('flex gap-x-2 px-2 py-[1.125rem] items-center', {
  variants: {
    type: {
      noti: 'bg-brand-100 rounded-2xl',
      issue: 'border-b border-gray-200',
      normal: 'border-b border-gray-200',
    },
  },
});

interface BoardRowProps {
  /** @param {PostInfo} post - 게시글 정보 */
  post: PostInfo;
  /** @param {'noti' | 'issue' | 'normal'} type - 게시글 종류 */
  type: 'noti' | 'issue' | 'normal';
  /** @param {number} postNumber - 전체 게시글 기준 번호 */
  postNumber: number;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=283-6314&t=o6ABJQovotn5Ocaz-4
 */
export default function BoardRow({ post, type, postNumber }: BoardRowProps) {
  const pathname = usePathname();
  return (
    <div className={cn(rowVariants({ type }))}>
      <span className="w-12 text-center text-sm font-regular text-gray-500">{postNumber}</span>
      <span className="flex flex-1 items-center gap-x-2">
        {type === 'noti' ? (
          <BadgeButton variant="yellow">공지</BadgeButton>
        ) : type === 'issue' ? (
          <BadgeButton variant="blue">이슈</BadgeButton>
        ) : null}
        <Link href={`${pathname}/post/${post.postId}`}>
          <span className="flex cursor-pointer gap-x-1.5">
            <span className="text-md font-semiBold text-gray-800 hover:underline">
              {post.title}
            </span>
            <span className="text-xs font-regular text-gray-500">
              [{post.commentCount.toLocaleString()}]
            </span>
          </span>
        </Link>
      </span>
      <span className="flex w-[6.25rem] items-center gap-x-1.5">
        <Image
          src="/images/icons/icon_profile_88x88.png"
          alt="프로필 사진"
          width={20}
          height={20}
        />
        <span className="text-xs font-regular text-gray-500">{post.writer}</span>
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {post.viewCount.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {post.likeCount.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {dayjs(post.createdAt).format('MM.DD')}
      </span>
    </div>
  );
}
