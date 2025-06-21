'use client';
import { BoardList, getPoliticsPosts } from '@/entities/board';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PoliticsBoardSection = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<PostListResponse>({
    queryKey: ['politicsPosts', page],
    queryFn: () => getPoliticsPosts(page, BOARD_PAGE_SIZE),
  });

  if (!data) return null;
  return (
    <div className="flex flex-col gap-8">
      <BoardList posts={data.postsListDto} totalCount={data.totalCount} page={page} />
      <Pagination currentPage={page} maxPage={data.totalPageCount} count={5} setPage={setPage} />
    </div>
  );
};

export default PoliticsBoardSection;
