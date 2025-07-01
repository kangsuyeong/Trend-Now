'use client';

import React from 'react';
import Comment from './Comment';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/shared/store';
import { axiosGetComments } from '@/shared/api';
import { CommentList } from '@/shared/types';
import WriteComment from './WriteComment';

interface CommentsProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
}

export default function Comments({ postId, boardId }: CommentsProps) {
  const { jwt } = useUserStore();

  const { data } = useQuery({
    queryKey: ['comments', boardId, postId, jwt],
    queryFn: () => axiosGetComments<CommentList[]>(boardId, postId, jwt!),
    enabled: !!jwt && !!boardId && !!postId,
  });

  return (
    <div className="flex flex-col gap-y-7 border-t border-gray-200 pt-8">
      <div className="flex flex-col gap-y-7 rounded-3xl bg-gray-100 p-6">
        <span className="flex items-center gap-x-2.5 before:inline-block before:h-5 before:w-[3px] before:rounded-full before:bg-brand-500">
          <span className="flex items-center gap-x-2">
            <span className="text-xl font-bold text-gray-800">전체 댓글</span>
            <span className="text-xl font-bold text-brand-500">{data?.length}</span>
          </span>
        </span>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col divide-y divide-gray-200">
            {data &&
              data.map((item, idx) => (
                <Comment
                  key={idx}
                  userName={'사용자 이름'}
                  date={item.createdAt}
                  content={item.content}
                />
              ))}
          </div>
        </div>
        <WriteComment boardId={boardId} postId={postId} />
      </div>
    </div>
  );
}
