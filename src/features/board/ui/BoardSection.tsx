'use client';
import { BoardList } from '@/entities/board';
import { axiosPosts } from '@/shared/api';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface BoardSectionProps {
  boardId: number;
}

const BoardSection = ({ boardId }: BoardSectionProps) => {
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ['posts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, BOARD_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8">
      <BoardList posts={data.postsListDto} basePath={`/board/${boardId}`} showNumber />
      <Pagination currentPage={page} maxPage={1} count={5} setPage={setPage} />
    </div>
  );
};

export default BoardSection;
