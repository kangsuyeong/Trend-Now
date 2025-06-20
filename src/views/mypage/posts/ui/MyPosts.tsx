'use client';

import { PostsResponse } from '@/entities';
import { axiosMyPosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { Pagination } from '@/shared/ui';
import { MyPostRow } from '@/widgets/mypage';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const MyPosts = () => {
  const { jwt, memberId } = useUserStore();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['myposts', memberId],
    queryFn: () => axiosMyPosts<PostsResponse>(jwt!, page, 20),
    enabled: !!jwt,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (data && data.postListDto.length > 0) {
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
                id={idx}
                title={item.title}
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
          <span className="text-sm font-medium text-gray-500">작성한 게시글이 없습니다.</span>
        </div>
      );
    }
  }
};

export default MyPosts;
