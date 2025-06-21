import React from 'react';
import MedalRow from './MedalRow';
import HotBoardListRow from './CurrentHotRow';
import { useQuery } from '@tanstack/react-query';
import { HotBoardResponse } from '@/entities';
import { axiosHotBoardList } from '@/shared/api';

export default function HotBoardList() {
  const { data } = useQuery({
    queryKey: ['hotBoardList'],
    queryFn: () => axiosHotBoardList<HotBoardResponse>(),
  });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 border-b border-gray-200 px-2 pb-4 *:text-nowrap *:text-sm *:font-regular *:text-gray-500">
        <span className="w-12 text-center">순위</span>
        <span className="flex-1 text-left">검색어</span>
        <span className="w-16 text-center">게시물 수</span>
        <span className="w-16 text-center">총 조회수</span>
        <span className="w-[6.5rem] text-center">타이머</span>
      </div>
      {data &&
        data.boardInfoDtos
          .slice(0, 3)
          .map((item, idx) => (
            <MedalRow
              key={item.boardId}
              boardId={item.boardId}
              rank={idx + 1}
              keyword={item.boardName}
              count={125}
              views={2324}
              timer={item.boardLiveTime}
            />
          ))}
      <div className="flex flex-col">
        {data &&
          data.boardInfoDtos
            .slice(3)
            .map((item, idx) => (
              <HotBoardListRow
                key={item.boardId}
                boardId={item.boardId}
                rank={idx + 4}
                keyword={item.boardName}
                count={125}
                views={2324}
                timer={item.boardLiveTime}
              />
            ))}
      </div>
    </div>
  );
}
