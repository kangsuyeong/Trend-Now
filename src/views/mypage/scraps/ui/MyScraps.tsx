'use client';

import { axiosMyScraps } from '@/shared/api';
import { MyPostsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { MyScrapRow } from '@/widgets/mypage';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const MyScraps = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['myscraps', page],
    queryFn: () => axiosMyScraps<MyPostsResponse>(page, 20),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.postListDto.length === 0) {
    return (
      <div className="flex h-[25rem] items-center justify-center rounded-[1.25rem] bg-gray-100">
        <span className="text-sm font-medium text-gray-500">스크랩한 게시글이 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 게시물 */}
      <div className="flex flex-col">
        <div className="mb-2 flex justify-between gap-2 border-b border-gray-200 pb-3 pl-12 pr-2 text-sm font-regular text-gray-500">
          <div>게시판/게시물 제목</div>
          <div className="flex gap-2 text-center">
            <div className="w-[6.25rem]">닉네임</div>
            <div className="w-12">조회수</div>
            <div className="w-12">추천</div>
            <div className="w-12">일자</div>
          </div>
        </div>
        {data.postListDto.map((item, idx) => (
          <MyScrapRow
            key={idx}
            boardId={item.boardId}
            postId={item.postId}
            boardName={item.boardName}
            title={item.title}
            nickname={item.writer}
            views={item.viewCount}
            likes={item.likeCount}
            created={item.createdAt}
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

export default MyScraps;
