'use client';

import { axiosMyPosts } from '@/shared/api';
import { MyPostsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { MyPostRow } from '@/widgets/mypage';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const MyPosts = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['myposts', page],
    queryFn: () => axiosMyPosts<MyPostsResponse>(page, 20),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.postListDto.length === 0) {
    return (
      <div className="flex h-[25rem] items-center justify-center rounded-[1.25rem] bg-gray-100">
        <span className="text-sm font-medium text-gray-500">작성한 게시글이 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 목차 / 게시물 */}
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-center text-sm font-regular text-gray-500">
          <div className="flex gap-2">
            <div className="w-12">번호</div>
            <div>게시물 제목</div>
          </div>
          <div className="flex gap-2">
            <div className="w-12">조회수</div>
            <div className="w-12">추천</div>
            <div className="w-12">일자</div>
          </div>
        </div>
        {data.postListDto.map((item, idx) => (
          <MyPostRow
            key={idx}
            boardId={item.boardId}
            postId={item.postId}
            title={item.title}
            views={item.viewCount}
            likes={item.likeCount}
            created={item.updatedAt}
            comments={item.commentCount}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        maxPage={data.totalPageCount || 1}
        count={5}
        setPage={setPage}
      />
    </div>
  );
};

export default MyPosts;
