import React from 'react';
import MedalRow from './MedalRow';
import HotBoardListRow from './CurrentHotRow';

export default function HotBoardList() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 border-b border-gray-200 px-2 pb-4 *:text-nowrap *:text-sm *:font-regular *:text-gray-500">
        <span className="w-12 text-center">순위</span>
        <span className="flex-1 text-left">검색어</span>
        <span className="w-16 text-center">게시물 수</span>
        <span className="w-16 text-center">총 조회수</span>
        <span className="w-[6.5rem] text-center">타이머</span>
      </div>
      {new Array(3).fill(0).map((_, idx) => (
        <MedalRow
          key={idx}
          rank={idx + 1}
          keyword="尹탄핵심판"
          count={125}
          views={2324}
          timer={3402}
        />
      ))}
      <div className="flex flex-col">
        {new Array(7).fill(0).map((_, idx) => (
          <HotBoardListRow
            key={idx}
            rank={idx + 4}
            keyword="서울 폭설"
            count={125}
            views={2324}
            timer={225}
          />
        ))}
      </div>
    </div>
  );
}
