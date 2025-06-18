'use client';

import { DateDivider, Pencil24, PrimaryButton, SecondaryButton } from '@/shared/ui';
import React from 'react';
import Image from 'next/image';
import { BoardList } from '@/widgets/boards';
import { usePathname, useRouter } from 'next/navigation';

interface HotBoardProps {
  /**@param {string} keyword 인기 검색어 키워드 */
  keyword: string;
}

export default function HotBoard({ keyword }: HotBoardProps) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <span className="flex flex-col gap-y-3">
              <span className="text-base font-semiBold text-brand-500">현재 실시간 검색어 1위</span>
              <span className="flex gap-x-3">
                <Image
                  src="/images/gold.gif"
                  alt="gold"
                  width={40}
                  height={40}
                  priority
                  unoptimized
                  className="aspect-square object-cover"
                />
                <span className="text-3xl font-bold text-gray-800">{keyword}</span>
              </span>
            </span>
            <span className="flex flex-col items-end gap-y-2">
              <span className="text-sm font-regular text-gray-500">
                이 시간이 지나면 게시판이 사라져요!
              </span>
              <span className="flex items-center gap-x-1">
                <span className="h-10 w-10" />
                <span className="text-3xl font-bold text-brand-500">08:40</span>
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-2">
            <PrimaryButton variant="primary" size="s">
              오늘
            </PrimaryButton>
            <SecondaryButton variant="primary" size="s">
              2025년 4월 8일
            </SecondaryButton>
            <SecondaryButton variant="primary" size="s">
              2025년 4월 1일
            </SecondaryButton>
          </span>
          <PrimaryButton
            variant="black"
            size="m"
            className="pl-4"
            onClick={() => router.push(path + '/write')}
          >
            <span className="flex items-center gap-x-1">
              <Pencil24 />
              글쓰기
            </span>
          </PrimaryButton>
        </div>
        <BoardList />
        {/* <Pagination currentPage={1} maxPage={20} count={5} /> */}
      </div>
    </div>
  );
}
