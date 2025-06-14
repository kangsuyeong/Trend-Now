import React from 'react';
import { BoardHedaer, BoardListByType } from '@/widgets/boards';

interface BoardProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

export default function Board({ type }: BoardProps) {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <BoardHedaer type={type} />
        <BoardListByType type={type} />
      </div>
    </div>
  );
}
