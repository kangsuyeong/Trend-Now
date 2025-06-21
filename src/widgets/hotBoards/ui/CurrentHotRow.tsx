import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GrayTimer28, OrangeTimer28, BlueTimer28 } from './icons';

const timerVariants = cva('text-xl font-semiBold', {
  variants: {
    variant: {
      blue: 'text-brand-500',
      orange: 'text-point-500',
      gray: 'text-gray-400',
    },
  },
});

interface HotBoardListRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} rank 순위 */
  rank: number;
  /**@param {string} keyword 검색어 */
  keyword: string;
  /**@param {number} count 게시물 수 */
  count: number;
  /**@param {number} views 총 조회수 */
  views: number;
  /**@param {number} timer 타이머 */
  timer: number;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=110-12045&t=J0Jb8mvTQUQUNMvU-4
 */
export default function HotBoardListRow({
  boardId,
  rank,
  keyword,
  count,
  views,
  timer,
}: HotBoardListRowProps) {
  const [timeLeft, setTimeLeft] = useState<number>(timer);

  const variant = timeLeft === 0 ? 'gray' : timeLeft < 600 ? 'orange' : 'blue';
  const min = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timeLeft % 60).toString().padStart(2, '0');

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft < 1) {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  return (
    <Link href={`/hotBoard/${keyword}?boardId=${boardId}`}>
      <div className="flex cursor-pointer items-center justify-between rounded-xl py-4 pl-2 pr-4 hover:bg-gray-100">
        <span className="flex items-center gap-x-3">
          <span className="h-7 w-7 text-center text-lg font-bold text-gray-800">{rank}</span>
          <span className="text-lg font-semiBold text-gray-800">{keyword}</span>
        </span>
        <span className="flex items-center gap-x-2">
          <span className="w-16 text-sm font-regular text-gray-500">{count}</span>
          <span className="w-16 text-sm font-regular text-gray-500">{views}</span>
          <span className="flex w-[5.5rem] items-center gap-x-1">
            <span className="h-7 w-7">
              {timer === 0 ? <GrayTimer28 /> : timer < 600 ? <OrangeTimer28 /> : <BlueTimer28 />}
            </span>
            <span className={cn(timerVariants({ variant }))}>{`${min}:${sec}`}</span>
          </span>
        </span>
      </div>
    </Link>
  );
}
