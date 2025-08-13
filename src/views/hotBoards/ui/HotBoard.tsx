'use client';

import {
  CountdownTimer,
  DateDivider,
  Pagination,
  PrimaryButton,
  SecondaryButton,
} from '@/shared/ui';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosHotBoardInfo, axiosHotBoardList, axiosPosts } from '@/shared/api';
import { BoardList } from '@/entities/board';
import { HotBoardInfoResponse, HotBoardResponse, PostListResponse } from '@/shared/types';
import { BoardWriteButton } from '@/features/board';
import { useSearchParams } from 'next/navigation';

interface HotBoardProps {
  /**@param {number} boardId 게시판 Id */
  boardId: number;
}

export default function HotBoard({ boardId }: HotBoardProps) {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);

  const { data: posts } = useQuery({
    queryKey: ['hotBoardPosts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, 20),
  });

  const { data: boardInfo } = useQuery({
    queryKey: ['hotBoardInfo', boardId],
    queryFn: () => axiosHotBoardInfo<HotBoardInfoResponse>(boardId),
    refetchOnMount: true,
  });

  const { data: hotBoardList } = useQuery({
    queryKey: ['hotBoardList'],
    queryFn: () => axiosHotBoardList<HotBoardResponse>(),
    select: (data) => data.boardInfoDtos.findIndex((item) => item.boardId === boardId),
  });

  if (!posts || !boardInfo) return null;

  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <span className="flex flex-col gap-y-3">
              {hotBoardList !== undefined && hotBoardList > -1 && (
                <span className="text-base font-semiBold text-brand-500">
                  현재 실시간 검색어 {hotBoardList + 1}위
                </span>
              )}
              <span className="text-3xl font-bold text-gray-800">{boardInfo.boardName}</span>
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
          getHref={(p) => `/hotboard/${boardId}?page=${p}`}
        />
      </div>
    </div>
  );
}
