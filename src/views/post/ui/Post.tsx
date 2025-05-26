import { Comments } from '@/widgets/comments';
import { Content, Header } from '@/widgets/post';
import React from 'react';

interface PostProps {
  /**@param {string} postId 게시글 아이디(path parameter이므로 string) */
  postId: string;
}

export default function Post({}: PostProps) {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <Header />
        <Content />
        <Comments />
      </div>
    </div>
  );
}
