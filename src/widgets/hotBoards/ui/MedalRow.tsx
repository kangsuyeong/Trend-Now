import React from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Link from 'next/link';

const timerVariants = cva('text-2xl font-bold', {
  variants: {
    variant: {
      blue: 'text-brand-500',
      orange: 'text-point-500',
      gray: 'text-gray-400',
    },
  },
});

interface MedalRowProps {
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

export default function MedalRow({ rank, keyword, count, views, timer }: MedalRowProps) {
  const variant = timer === 0 ? 'gray' : timer < 600 ? 'orange' : 'blue';
  const min = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timer % 60).toString().padStart(2, '0');

  return (
    <Link href={`/hotBoard/keyword`}>
      <div className="flex cursor-pointer flex-col gap-y-4 rounded-[1.25rem] bg-brand-100 p-4 hover:bg-[#EDF5FF]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-4">
            {rank === 1 ? (
              <Image
                src="/images/gold.gif"
                alt="gold"
                width={40}
                height={40}
                priority
                className="aspect-square object-cover"
              />
            ) : rank === 2 ? (
              <Image
                src="/images/silver.gif"
                alt="gold"
                width={40}
                height={40}
                priority
                className="aspect-square object-cover"
              />
            ) : (
              <Image
                src="/images/bronze.gif"
                alt="gold"
                width={40}
                height={40}
                priority
                className="aspect-square object-cover"
              />
            )}
            <span className="text-xl font-bold text-brand-500">{keyword}</span>
          </span>
          <span className="flex items-center gap-x-2">
            <span className="w-16 text-center text-md font-regular text-gray-500">{count}</span>
            <span className="w-16 text-center text-md font-regular text-gray-500">{views}</span>
            <span className="flex gap-x-1">
              <span className="h-8 w-8"></span>
              <span className={cn(timerVariants({ variant }))}>{`${min}:${sec}`}</span>
            </span>
          </span>
        </div>
        {/* {currentExpand === rank && (
        <div className="gap-y-1 rounded-2xl bg-white px-4 py-3">
          <div>
            <span className="flex items-center gap-x-1">
              <span>
                <Fire />
              </span>
              <span className="text-md font-semiBold text-gray-800">尹탄핵심판 게시판 인기글</span>
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm font-medium text-gray-500">탄핵선고가 늦어지는 이유</span>
            <span className="flex gap-x-3">
              <span className="flex items-center gap-x-1.5">
                <Heart18 />
                <span className="text-sm font-regular text-gray-500">447</span>
              </span>
              <span className="flex items-center gap-x-1.5">
                <Comment18 />
                <span className="text-sm font-regular text-gray-500">3</span>
              </span>
            </span>
          </div>
        </div>
      )} */}
      </div>
    </Link>
  );
}
