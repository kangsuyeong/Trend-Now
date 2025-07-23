import Link from 'next/link';
import React from 'react';
import { CountdownTimer } from '@/shared/ui';

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
  return (
    <Link href={`/hotboard/${boardId}`}>
      <div className="flex cursor-pointer items-center justify-between rounded-xl py-4 pl-2 pr-4 hover:bg-gray-100">
        <span className="flex items-center gap-x-3">
          <span className="h-7 w-7 text-center text-lg font-bold text-gray-800">{rank}</span>
          <span className="text-lg font-semiBold text-gray-800">{keyword}</span>
        </span>
        <span className="flex items-center gap-x-2">
          <span className="w-16 text-sm font-regular text-gray-500">{count}</span>
          <span className="w-16 text-sm font-regular text-gray-500">{views}</span>
          <CountdownTimer textSize="text-xl" iconSize={28} initialSeconds={timer} />
        </span>
      </div>
    </Link>
  );
}
