'use client';

import { axiosSearchRealtimeBoards, axiosSearchRealtimePosts } from '@/shared/api';
import { axiosSearchFixedBoardPosts } from '@/shared/api/axios/axios';
import { BOARD_MAP } from '@/shared/constants';
import type {
  SearchFixedBoardsResponse,
  SearchRealtimeBoardsResponse,
  SearchRealtimePostsResponse,
} from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

interface SearchHeaderProps {
  keyword: string;
}

const SearchHeader = ({ keyword }: SearchHeaderProps) => {
  const { data: boards } = useQuery({
    queryKey: ['SearchRealtimeBoards', keyword],
    queryFn: () => axiosSearchRealtimeBoards<SearchRealtimeBoardsResponse>(keyword),
    select: (data) => data.searchResult,
  });
  const { data: posts } = useQuery({
    queryKey: ['SearchRealtimePosts', keyword, 1],
    queryFn: () => axiosSearchRealtimePosts<SearchRealtimePostsResponse>(keyword),
    select: (data) => data.searchResult,
  });

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

  if (!boards || !posts || !freePosts || !entertainPosts || !politicsPosts) return null;

  const totalCount =
    boards.length +
    posts.realtimePostList.length +
    freePosts.totalCount +
    entertainPosts.totalCount +
    politicsPosts.totalCount;

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-lg font-semiBold text-gray-500">
        총 {totalCount.toLocaleString()}개의 검색결과
      </span>
      <span className="text-4xl font-bold text-gray-800">{keyword}</span>
    </div>
  );
};

export default SearchHeader;
