'use client';

import React from 'react';
import Comment from './Comment';
import { PrimaryButton } from '@/shared/ui';
import { CommentIcon } from '../icons';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/shared/store';
import { axiosGetComments } from '@/shared/api';
import { CommentList } from '@/shared/types';

interface CommentsProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
}

export default function Comments({ postId, boardId }: CommentsProps) {
  const { jwt } = useUserStore();

  const [commentText, setCommentText] = React.useState('');

  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

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
        <div className="flex flex-col gap-y-2">
          <span className="flex items-center gap-x-1.5">
            <CommentIcon />
            <span className="select-none text-md font-semiBold text-gray-800">댓글 작성</span>
          </span>
          <div className="flex flex-col gap-y-2 rounded-2xl border border-gray-300 bg-white p-4">
            <textarea
              ref={commentRef}
              onChange={handleCommentChange}
              placeholder="댓글을 작성해주세요."
              className="w-full resize-none text-md font-medium text-gray-800 field-sizing-content placeholder:text-gray-500 focus:outline-none"
            ></textarea>
            <div className="flex justify-end">
              <PrimaryButton
                variant={commentText.length > 0 ? 'black' : 'gray'}
                size="m"
                disabled={!commentText}
              >
                등록
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
