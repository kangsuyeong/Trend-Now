'use client';
import { BoardList } from '@/entities/board';
import { SearchSectionTitle, SearchTypeTabs } from '@/entities/search';
import { axiosSearchFixedBoardPosts } from '@/shared/api/axios/axios';
import { BOARD_MAP } from '@/shared/constants';
import type { BoardType, SearchFixedBoardsResponse } from '@/shared/types';
import { EmptyState, Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface FixedBoardsSectionProps {
  keyword: string;
}

interface Tab {
  key: BoardType;
  label: string;
  count: number;
}

const FixedBoardsSection = ({ keyword }: FixedBoardsSectionProps) => {
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<BoardType>('free');

  const { data: freePosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.free.id, 1],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.free.id),
    select: (data) => data.searchResult,
  });
  const { data: entertainPosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.entertain.id, 1],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.entertain.id),
    select: (data) => data.searchResult,
  });
  const { data: politicsPosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.politics.id, 1],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.politics.id),
    select: (data) => data.searchResult,
  });

  if (!freePosts || !entertainPosts || !politicsPosts) return null;

  const totalCount = freePosts.totalCount + entertainPosts.totalCount + politicsPosts.totalCount;

  const tabs: Tab[] = Object.entries(BOARD_MAP).map(([key, { name }]) => {
    const boardType = key as BoardType;
    return {
      key: boardType,
      label: `${name}게시판`,
      count: {
        free: freePosts.totalCount,
        entertain: entertainPosts.totalCount,
        politics: politicsPosts.totalCount,
      }[boardType],
    };
  });

  const postData = {
    free: freePosts,
    entertain: entertainPosts,
    politics: politicsPosts,
  }[currentTab];

  return (
    <div className="flex flex-col gap-5">
      <SearchSectionTitle title="고정 게시판" count={totalCount} />
      <SearchTypeTabs tabs={tabs} currentTab={currentTab} onTabChange={setCurrentTab} />
      {postData.postList.length === 0 ? (
        <EmptyState
          message={`검색하신 키워드에 대한 게시글이 아직 없습니다. \n 지금 첫 번째 글을 작성해보세요.`}
          className="h-80"
        />
      ) : (
        <>
          <BoardList
            posts={postData.postList}
            totalCount={postData.totalCount}
            page={page}
            basePath={`/${currentTab}`}
            showNumber={false}
          />
          <Pagination
            currentPage={page}
            maxPage={postData.totalPageCount}
            count={5}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};

export default FixedBoardsSection;
