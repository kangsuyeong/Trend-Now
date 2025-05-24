import { BookmarkButton, KebabButton } from '@/features/post';
import React from 'react';

interface PostProps {
  /**@param {string} postId 게시글 아이디(path parameter이므로 string) */
  postId: string;
}

export default function Post({}: PostProps) {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-8 border-b border-gray-200 pb-6">
          <div className="flex justify-between">
            <span className="flex flex-col gap-y-3">
              <span className="text-lg font-semiBold text-gray-500">자유게시판</span>
              <span className="text-2xl font-bold text-gray-800">
                헌재 전원일치로 윤석열 대통령 파면… 중대위법, 국민신임 배반
              </span>
            </span>
            <span className="flex gap-x-2">
              <BookmarkButton />
              <KebabButton />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
