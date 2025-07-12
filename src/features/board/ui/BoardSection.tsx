'use client';
import { BoardList } from '@/entities/board';
import { axiosPosts } from '@/shared/api';
import { BOARD_MAP, BOARD_PAGE_SIZE } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface BoardSectionProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

const BoardSection = ({ type }: BoardSectionProps) => {
  const [page, setPage] = useState(1);
  const boardId = BOARD_MAP[type].id;
  const { data } = useQuery({
    queryKey: ['posts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, BOARD_PAGE_SIZE),
  });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8">
      <BoardList
        posts={data.postsListDto}
        totalCount={data.totalCount}
        page={page}
        basePath={type}
      />
      <Pagination currentPage={page} maxPage={data.totalPageCount} count={5} setPage={setPage} />
    </div>
  );
};

export default BoardSection;
