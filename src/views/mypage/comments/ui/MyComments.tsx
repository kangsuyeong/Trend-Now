'use client';

import { PostsResponse } from '@/entities';
import { axiosMyPosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { Pagination } from '@/shared/ui';
import { MyCommentRow } from '@/widgets/mypage';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const MyComments = () => {
  const { jwt } = useUserStore();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['myposts', page, jwt],
    queryFn: () => axiosMyPosts<PostsResponse>(jwt!, page, 20),
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
            <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-sm font-regular text-gray-500">
              <div>게시글 제목/작성한 댓글</div>
              <div className="w-12 text-center">일자</div>
            </div>
            {new Array(20).fill(0).map((_, idx) => (
              <MyCommentRow
                key={idx}
                title={'게시판 제목'}
                comment={'댓글 내용적어요'}
                created={new Date()}
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
          <span className="text-sm font-medium text-gray-500">작성한 댓글이 없습니다.</span>
        </div>
      );
    }
  }
};

export default MyComments;
