import React from 'react';
import { BoardHeader, BoardListByType } from '@/widgets/boards';
import { BoardSection } from '@/features/board';

interface BoardProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

export default function Board({ type }: BoardProps) {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <BoardHeader type={type} />
        <BoardSection type={type} />
      </div>
    </div>
  );
}
