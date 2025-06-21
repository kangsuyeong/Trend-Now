import React from 'react';
import BoardRow from './BoardRow';
import { Posts } from '@/entities';

interface BoardListProps {
  /**@param {Posts[]} posts 게시글 목록 데이터 */
  posts: Posts[];
}

export default function BoardList({ posts }: BoardListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2 border-b border-gray-200 px-2 pb-3 *:text-sm *:font-regular *:text-gray-500">
        <span className="w-12 text-center">번호</span>
        <span className="flex-1 text-left">게시글 제목</span>
        <span className="w-[6.25rem] text-center">닉네임</span>
        <span className="w-12 text-center">조회수</span>
        <span className="w-12 text-center">추천</span>
        <span className="w-12 text-center">일자</span>
      </div>
      {posts.map((item, idx) => (
        <BoardRow
          key={idx}
          number={item.postId}
          title={item.title}
          nickname={item.writer}
          views={item.viewCount}
          likes={item.likeCount}
          created={new Date(item.createdAt)}
          comments={item.commentCount}
          type="normal"
        />
      ))}
    </div>
  );
}
