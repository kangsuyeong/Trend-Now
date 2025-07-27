import { ScrapToggleButton } from '@/features/scrap';
import { UserProfile20 } from '@/shared/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

interface MyScrapRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} postId 게시글 ID */
  postId: number;
  /**@param {string} title 게시판 제목 */
  boardName: string;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {string} nickname 닉네임 */
  nickname: string;
  /**@param {number} views 조회수 */
  views: number;
  /**@param {number} likes 추천 */
  likes: number;
  /**@param {created} created 일자 */
  created: string;
  /**@param {number} comments 댓글 수 */
  comments: number;
}

const MyScrapRow = ({
  boardId,
  postId,
  boardName,
  title,
  nickname,
  views,
  likes,
  created,
  comments,
}: MyScrapRowProps) => {
  return (
    <Link href={`/board/${boardId}/post/${postId}`}>
      <div className="flex w-full justify-between border-b border-gray-200 px-2 py-4">
        <div className="flex items-center gap-4">
          <ScrapToggleButton size={'s'} />
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-brand-500">{boardName}</div>
            <div className="flex items-center gap-1.5">
              <div className="text-md font-semibold text-gray-800 hover:underline">{title}</div>
              <div className="text-xs text-gray-500">[{comments}]</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-center text-sm font-regular text-gray-500">
          <div className="flex w-[6.25rem] items-center justify-center gap-x-1.5">
            <UserProfile20 />
            <div>{nickname}</div>
          </div>
          <div className="w-12">{views.toLocaleString()}</div>
          <div className="w-12">{likes.toLocaleString()}</div>
          <div className="w-12">{dayjs(created).format('MM.DD')}</div>
        </div>
      </div>
    </Link>
  );
};

export default MyScrapRow;
