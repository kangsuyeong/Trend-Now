'use client';

import { HotPostsSearchList, SearchSectionTitle } from '@/entities/search';
import { axiosSearchRealtimePosts } from '@/shared/api';
import type { SearchRealtimePostsResponse } from '@/shared/types';
import { EmptyState, Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface HotPostsSectionProps {
  keyword: string;
}

const HotPostsSection = ({ keyword }: HotPostsSectionProps) => {
  const [page, setPage] = useState(1);

  const { data: posts } = useQuery({
    queryKey: ['SearchRealtimePosts', keyword, page],
    queryFn: () => axiosSearchRealtimePosts<SearchRealtimePostsResponse>(keyword, page),
    select: (data) => data.searchResult,
  });

  if (!posts) return null;
  return (
    <div className="flex flex-col gap-y-5">
      <SearchSectionTitle title="실시간 인기 게시글" count={posts.realtimePostList.length} />
      {posts.realtimePostList.length === 0 ? (
        <EmptyState message="검색하신 키워드에 대한 게시물이 아직 없습니다." className="h-80" />
      ) : (
        <>
          <HotPostsSearchList posts={posts.realtimePostList} />
          <Pagination
            currentPage={page}
            setPage={setPage}
            maxPage={posts.totalPageCount}
            count={5}
          />
        </>
      )}
    </div>
  );
};

export default HotPostsSection;
