'use client';

import React, { Fragment } from 'react';
import Comment from './Comment';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/shared/store';
import { axiosGetComments } from '@/shared/api';
import { CommentResponse } from '@/shared/types';
import WriteComment from './WriteComment';
import CommentsEmpty from './CommentsEmpty';

interface CommentsProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
}

export default function Comments({ postId, boardId }: CommentsProps) {
  const { accessToken } = useUserStore();

  const { data, refetch } = useQuery({
    queryKey: ['comments', boardId, postId, accessToken],
    queryFn: () => axiosGetComments<CommentResponse>(boardId, postId, accessToken, 1, 50),
    enabled: !!boardId && !!postId,
    select: (data) => data.findAllCommentsDtos,
  });

  return (
    <div className="flex flex-col border-t border-gray-200 pt-4">
      <div className="flex flex-col gap-y-5 rounded-3xl bg-gray-100 p-6">
        <span className="flex items-center gap-x-2.5 before:inline-block before:h-5 before:w-[3px] before:rounded-full before:bg-brand-500">
          <span className="flex items-center gap-x-2">
            <span className="text-xl font-bold text-gray-800">전체 댓글</span>
            <span className="text-xl font-bold text-brand-500">{data?.length}</span>
          </span>
        </span>
        <div className="flex flex-col gap-2">
          {!data || data.length === 0 ? (
            <CommentsEmpty />
          ) : (
            <div className="flex flex-col">
              {data.map((item, idx) => (
                <Fragment key={idx}>
                  <Comment
                    key={idx}
                    userName={item.writer}
                    date={item.createdAt}
                    content={item.content}
                    showMenu={item.myComments}
                    boardId={boardId}
                    postId={postId}
                    commentId={item.commentId}
                    refetch={refetch}
                  />
                  <hr className="my-5 border-gray-200" />
                </Fragment>
              ))}
            </div>
          )}
          <WriteComment boardId={boardId} postId={postId} refetch={refetch} />
        </div>
      </div>
    </div>
  );
}
