import React from 'react';

interface PostProps {
  /**@param {string} postId 게시글 아이디(path parameter이므로 string) */
  postId: string;
}

export default function Post({ postId }: PostProps) {
  return <div className="flex border-r border-gray-200 bg-white pr-8">{postId}</div>;
}
