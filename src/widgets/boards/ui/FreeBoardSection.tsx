'use client';
import { BoardList, getFreePosts, PostsResponse } from '@/entities/board';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const FreeBoardSection = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<PostsResponse>({
    queryKey: ['freePosts', page],
    queryFn: () => getFreePosts(),
  });
  return (
    <div className="flex flex-col gap-8">
      <BoardList posts={data?.postsInfoListDto ?? []} />
      <Pagination currentPage={1} maxPage={20} count={5} />
    </div>
  );
};

export default FreeBoardSection;
