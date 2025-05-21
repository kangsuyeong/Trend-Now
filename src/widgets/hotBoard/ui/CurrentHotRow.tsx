import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';
import React from 'react';

const timerVariants = cva('text-xl font-semiBold', {
  variants: {
    variant: {
      blue: 'text-brand-500',
      orange: 'text-point-500',
      gray: 'text-gray-400',
    },
  },
});

interface CurrentHotRowProps {
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
export default function CurrentHotRow({ rank, keyword, count, views, timer }: CurrentHotRowProps) {
  const variant = timer === 0 ? 'gray' : timer < 600 ? 'orange' : 'blue';
  const min = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timer % 60).toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-between rounded-xl py-4 pl-2 pr-4 hover:bg-gray-100">
      <span className="flex items-center gap-x-3">
        <span className="h-7 w-7 text-lg font-bold text-gray-800">{rank}</span>
        <span className="text-lg font-semiBold text-gray-800">{keyword}</span>
      </span>
      <span className="flex gap-x-2">
        <span className="w-16 text-sm font-regular text-gray-500">{count}</span>
        <span className="w-16 text-sm font-regular text-gray-500">{views}</span>
        <span className="flex gap-x-1">
          <span className="h-7 w-7"></span>
          <span className={cn(timerVariants({ variant }))}>{`${min}:${sec}`}</span>
        </span>
      </span>
    </div>
  );
}
