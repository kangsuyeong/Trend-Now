import { BOARD_IDS } from '@/shared/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

interface MyPostRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} postId 게시글 ID */
  postId: number;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {number} views 조회수 */
  views: number;
  /**@param {number} likes 추천 */
  likes: number;
  /**@param {string} created 일자 */
  created: string;
  /**@param {number} comments 댓글 수 */
  comments: number;
}

const MyPostRow = ({ boardId, postId, title, views, likes, created, comments }: MyPostRowProps) => {
  const boardPath = [BOARD_IDS.FREE, BOARD_IDS.POLITICS, BOARD_IDS.ENTERTAIN].includes(boardId)
    ? `/board/${boardId}/post/${postId}`
    : `/hotboard/${boardId}/post/${postId}`;

  return (
    <div className="flex w-full justify-between border-b border-gray-200 px-2 py-[1.125rem] text-center">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-12 text-sm text-gray-500">{postId}</div>
          <div className="flex items-center gap-1.5">
            <Link href={boardPath}>
              <div className="cursor-pointer text-md font-semibold text-gray-800 hover:underline">
                {title}
              </div>
            </Link>
            <div className="text-xs text-gray-500">[{comments}]</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-regular text-gray-500">
        <div className="w-12">{views.toLocaleString()}</div>
        <div className="w-12">{likes.toLocaleString()}</div>
        <div className="w-12">{dayjs(created).format('MM.DD')}</div>
      </div>
    </div>
  );
};

export default MyPostRow;
