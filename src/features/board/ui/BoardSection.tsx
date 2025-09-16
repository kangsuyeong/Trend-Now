'use client';
import { BoardList, BoardTable } from '@/entities/board';
import { axiosPosts } from '@/shared/api';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface BoardSectionProps {
  boardId: number;
  basePath: string;
}

const BoardSection = ({ boardId, basePath }: BoardSectionProps) => {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { data } = useQuery({
    queryKey: ['posts', boardId, page],
    queryFn: () => axiosPosts<PostListResponse>(boardId, page, BOARD_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  // CSR에서 필요 (전부다 SSR로 전환시 삭제)
  if (!data) return null;

  const posts = data!.postsListDto;

  return (
    <div className="flex flex-col gap-8">
      <BoardTable>
        <BoardList posts={posts} basePath={`${basePath}/${boardId}`} showNumber />
      </BoardTable>
      {posts.length > 0 && (
        <Pagination
          currentPage={page}
          maxPage={data!.totalPageCount}
          count={5}
          getHref={(p) => `${basePath}/${boardId}?page=${p}`}
        />
      )}
    </div>
  );
};

export default BoardSection;
