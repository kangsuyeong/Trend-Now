'use client';
import { BoardList, BoardTable } from '@/entities/board';
import { SearchSectionTitle, SearchTypeTabs } from '@/entities/search';
import { axiosSearchFixedBoardPosts } from '@/shared/api/axios/axios';
import { BOARD_MAP } from '@/shared/constants';
import type { BoardType, SearchFixedBoardsResponse } from '@/shared/types';
import { EmptyState, Pagination, Pencil, SecondaryButton } from '@/shared/ui';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<BoardType>('free');
  const { data: freePosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.free.id, page],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.free.id, page),
    select: (data) => data.searchResult,
  });
  const { data: entertainPosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.entertain.id, page],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.entertain.id, page),
    select: (data) => data.searchResult,
  });
  const { data: politicsPosts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, BOARD_MAP.politics.id, page],
    queryFn: () =>
      axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(keyword, BOARD_MAP.politics.id, page),
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
    <section aria-label="고정 게시판 게시글 목록" className="flex flex-col gap-5">
      <SearchSectionTitle title="고정 게시판" count={totalCount} />
      <SearchTypeTabs
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        setPage={setPage}
      />
      {postData.postList.length === 0 ? (
        <EmptyState className="h-80 gap-4">
          <EmptyState.Text>
            {' 검색하신 키워드에 대한 게시글이 아직 없습니다. \n 지금 첫 번째 글을 작성해보세요.'}
          </EmptyState.Text>
          <SecondaryButton
            variant="black"
            size="s"
            onClick={() => {
              router.push(`/board/${BOARD_MAP[currentTab].id}`);
            }}
          >
            <Pencil className="h-5 w-5 text-gray-700" />첫 번째 글 작성하기
          </SecondaryButton>
        </EmptyState>
      ) : (
        <>
          <BoardTable showNumber={false}>
            <BoardList
              posts={postData.postList}
              basePath={`/board/${BOARD_MAP[currentTab].id}`}
              showNumber={false}
            />
          </BoardTable>
          <Pagination
            currentPage={page}
            maxPage={postData.totalPageCount}
            count={5}
            setPage={setPage}
          />
        </>
      )}
    </section>
  );
};

export default FixedBoardsSection;
