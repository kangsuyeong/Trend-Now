'use client';

import React from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { BadgeButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  /**@param {number} number 번호 */
  number: number;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {string} nickname 닉네임 */
  nickname: string;
  /**@param {number} views 조회수 */
  views: number;
  /**@param {number} likes 추천 */
  likes: number;
  /**@param {Date} created 일자 */
  created: Date;
  /**@param {number} comments 댓글 수 */
  comments: number;
  /**@param {'noti' | 'issue' | 'normal'} type 게시글 종류 */
  type: 'noti' | 'issue' | 'normal';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=283-6314&t=o6ABJQovotn5Ocaz-4
 */
export default function BoardRow({
  number,
  title,
  nickname,
  views,
  likes,
  created,
  comments,
  type,
}: BoardRowProps) {
  const pathname = usePathname();
  const month = created.getMonth() + 1;
  const date = created.getDate();

  return (
    <div className={cn(rowVariants({ type }))}>
      <span className="w-12 text-center text-sm font-regular text-gray-500">{number}</span>
      <span className="flex flex-1 items-center gap-x-2">
        {type === 'noti' ? (
          <BadgeButton variant="yellow">공지</BadgeButton>
        ) : type === 'issue' ? (
          <BadgeButton variant="blue">이슈</BadgeButton>
        ) : null}
        <Link href={`${pathname}/post/${number}`}>
          <span className="flex cursor-pointer gap-x-1.5">
            <span className="text-md font-semiBold text-gray-800 hover:underline">{title}</span>
            <span className="text-xs font-regular text-gray-500">
              [{comments.toLocaleString()}]
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
        <span className="text-xs font-regular text-gray-500">{nickname}</span>
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {views.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {likes.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {month.toString().padStart(2, '0')}.{date.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
