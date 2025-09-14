'use client';

import React, { useEffect } from 'react';
import HotBoardListRow from './HotBoardListRow';
import MedalRow from './MedalRow';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosHotBoardList, SSE } from '@/shared/api';
import { BoardTimeUp, HotBoardResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { useSearchParams } from 'next/navigation';

export default function HotBoardList() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);

  const queryKey = ['hotBoardList', page];

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () => axiosHotBoardList<HotBoardResponse>(page),
    refetchOnMount: true,
  });

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('realtimeBoardTimeUp', (e) => {
      const data: BoardTimeUp = JSON.parse(e.data);
      console.log('HotBoardList', data);
      queryClient.invalidateQueries({ queryKey: queryKey });
    });
  }, []);

  if (!data) return null;

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-3 border-b border-gray-200 px-2 pb-4 *:text-nowrap *:text-sm *:font-regular *:text-gray-500">
          <span className="w-12 text-center">순위</span>
          <span className="flex-1 text-left">검색어</span>
          <span className="w-16 text-center">게시물 수</span>
          <span className="w-16 text-center">총 조회수</span>
          <span className="w-[6.5rem] text-center">타이머</span>
        </div>
        {data &&
          data.boardInfoDtos.map((item, idx) =>
            page === 1 && idx < 3 ? (
              <MedalRow
                key={item.boardId}
                boardId={item.boardId}
                rank={idx + 1 + (page - 1) * 10}
                keyword={item.boardName}
                count={item.postCount}
                views={item.viewCount}
                timer={item.boardLiveTime}
              />
            ) : (
              <HotBoardListRow
                key={item.boardId}
                boardId={item.boardId}
                rank={idx + 1 + (page - 1) * 10}
                keyword={item.boardName}
                count={item.postCount}
                views={item.viewCount}
                timer={item.boardLiveTime}
              />
            )
          )}
      </div>
      {data.boardInfoDtos.length > 0 && (
        <Pagination
          currentPage={page}
          maxPage={data!.totalPageCount}
          count={5}
          getHref={(p) => `/?page=${p}`}
        />
      )}
    </div>
  );
}
