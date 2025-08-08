'use client';

import {
  CountdownTimer,
  DateDivider,
  Pagination,
  PrimaryButton,
  SecondaryButton,
} from '@/shared/ui';
import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { axiosHotBoardInfo, axiosPosts } from '@/shared/api';
import { BoardList } from '@/entities/board';
import { HotBoardInfoResponse, PostListResponse } from '@/shared/types';
import { BoardWriteButton } from '@/features/board';

interface HotBoardProps {
  /**@param {number} boardId 게시판 Id */
  boardId: number;
}

export default function HotBoard({ boardId }: HotBoardProps) {
  const [page, setPage] = useState<number>(1);

  const { data: posts } = useQuery({
    queryKey: ['hotBoardPosts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, 20),
  });

  const { data: boardInfo } = useQuery({
    queryKey: ['hotBoardInfo', boardId],
    queryFn: () => axiosHotBoardInfo<HotBoardInfoResponse>(boardId),
    refetchOnMount: true,
  });

  if (!posts || !boardInfo) return null;

  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <span className="flex flex-col gap-y-3">
              <span className="text-base font-semiBold text-brand-500">현재 실시간 검색어 1위</span>
              <span className="flex gap-x-3">
                <Image
                  src="/images/gold.gif"
                  alt="gold"
                  width={40}
                  height={40}
                  priority
                  unoptimized
                  className="aspect-square object-cover"
                />
                <span className="text-3xl font-bold text-gray-800">{boardInfo.boardName}</span>
              </span>
            </span>
            <span className="flex flex-col items-end gap-y-2">
              <span className="text-sm font-regular text-gray-500">
                이 시간이 지나면 게시판이 사라져요!
              </span>
              <span className="flex items-center gap-x-1">
                <span className="h-10 w-10" />
                <CountdownTimer
                  textSize="text-3xl"
                  iconSize={40}
                  initialSeconds={boardInfo.boardLiveTime}
                />
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-2">
            <PrimaryButton variant="primary" size="s">
              오늘
            </PrimaryButton>
            <SecondaryButton variant="primary" size="s">
              2025년 4월 8일
            </SecondaryButton>
            <SecondaryButton variant="primary" size="s">
              2025년 4월 1일
            </SecondaryButton>
          </span>
          <BoardWriteButton href={`/hotboard/${boardId}/write`} />
        </div>
        <BoardList posts={posts.postsListDto} basePath={`/hotboard/${boardId}`} />
        <Pagination
          currentPage={page}
          maxPage={posts.totalPageCount || 1}
          count={5}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
