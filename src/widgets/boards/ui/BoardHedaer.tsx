'use client';
import { BOARD_MAP } from '@/shared/constants';
import { DateDivider, Pencil24, PrimaryButton } from '@/shared/ui';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface BoardHedaerProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

const BoardHedaer = ({ type }: BoardHedaerProps) => {
  const router = useRouter();
  const path = usePathname();
  const boardName = BOARD_MAP[type].name;

  return (
    <div className="flex flex-col gap-y-6">
      <DateDivider date={new Date()} background="black" />
      <div className="flex items-end justify-between">
        <span className="flex flex-col gap-y-2">
          <span className="text-md font-regular text-gray-500">
            이곳은 타이머 없는 이야기의 공간입니다. 누구나, 무엇이든 이야기 해보세요.
          </span>
          <span className="text-3xl font-bold text-gray-800">{boardName}게시판</span>
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
  );
};

export default BoardHedaer;
