'use client';
import { BoardList, getEntertainPosts, PostsResponse } from '@/entities/board';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const EntertainBoardSection = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<PostsResponse>({
    queryKey: ['freePosts', page],
    queryFn: () => getEntertainPosts(),
  });
  return (
    <div className="flex flex-col gap-8">
      <BoardList posts={data?.postsInfoListDto ?? []} />
      <Pagination currentPage={1} maxPage={20} count={5} />
    </div>
  );
};

export default EntertainBoardSection;
