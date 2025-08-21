'use client';
import { BoardList } from '@/entities/board';
import { axiosPosts } from '@/shared/api';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface BoardSectionProps {
  boardId: number;
}

const BoardSection = ({ boardId }: BoardSectionProps) => {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { data } = useQuery({
    queryKey: ['posts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, BOARD_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex flex-col gap-8">
      <BoardList posts={data!.postsListDto} basePath={`/board/${boardId}`} showNumber />
      <Pagination
        currentPage={page}
        maxPage={data!.totalPageCount}
        count={5}
        getHref={(p) => `/board/${boardId}?page=${p}`}
      />
    </div>
  );
};

export default BoardSection;
