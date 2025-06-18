'use client';

import { DateDivider, Pencil24, PrimaryButton } from '@/shared/ui';
import React from 'react';
import { BoardList } from '@/widgets/boards';
import { usePathname, useRouter } from 'next/navigation';

interface BoardProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

export default function Board({ type }: BoardProps) {
  const router = useRouter();
  const path = usePathname();
  const boardType = type === 'entertain' ? '연예' : type === 'free' ? '자유' : '정치';

  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <span className="flex flex-col gap-y-2">
              <span className="text-md font-regular text-gray-500">
                이곳은 타이머 없는 이야기의 공간입니다. 누구나, 무엇이든 이야기 해보세요.
              </span>
              <span className="text-3xl font-bold text-gray-800">{boardType}게시판</span>
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
        </div>
        <BoardList />
        {/* <Pagination currentPage={1} maxPage={20} count={5} /> */}
      </div>
    </div>
  );
}
