import { BOARD_IDS } from '@/shared/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

interface MyCommentRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} postId 게시글 ID */
  postId: number;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {string} comment 댓글 */
  comment: string;
  /**@param {string} created 일자 */
  created: string;
}

const MyCommentRow = ({ boardId, postId, title, created, comment }: MyCommentRowProps) => {
  const boardPath = BOARD_IDS.includes(boardId)
    ? `/board/${boardId}/post/${postId}`
    : `/hotboard/${boardId}/post/${postId}`;

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-2 py-4">
      <div className="flex flex-col gap-1">
        <div className="text-xs font-medium text-brand-500">{title}</div>
        <div className="cursor-pointer text-md font-semibold text-gray-800 hover:underline">
          <Link href={boardPath}>{comment}</Link>
        </div>
      </div>
      <div className="w-12 text-center text-sm font-regular text-gray-500">
        {dayjs(created).format('MM.DD')}
      </div>
    </div>
  );
};

export default MyCommentRow;
