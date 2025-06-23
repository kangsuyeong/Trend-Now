'use client';

import { PostsResponse } from '@/entities';
import { axiosMyScraps } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { Pagination } from '@/shared/ui';
import { MyScrapRow } from '@/widgets/mypage';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const MyScraps = () => {
  const { jwt } = useUserStore();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['myscraps', page, jwt],
    queryFn: () => axiosMyScraps<PostsResponse>(jwt!, page, 20),
    enabled: !!jwt,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (data && data.postListDto.length > 0) {
      return (
        <div className="flex flex-col gap-6">
          {/* 게시물 */}
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between gap-2 border-b border-gray-200 pb-3 pl-12 pr-2 text-sm font-regular text-gray-500">
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
                board={item.boardIdName}
                title={item.title}
                nickname={item.writer}
                views={item.viewCount}
                likes={item.likeCount}
                created={new Date(item.updatedAt)}
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
    } else {
      return (
        <div className="flex h-[25rem] items-center justify-center rounded-[1.25rem] bg-gray-100">
          <span className="text-sm font-medium text-gray-500">스크랩한 게시글이 없습니다.</span>
        </div>
      );
    }
  }
};

export default MyScraps;
