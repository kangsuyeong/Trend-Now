import dayjs from 'dayjs';
import React from 'react';

interface MyPostRowProps {
  /**@param {number} title 번호 */
  id: number;
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

const MyPostRow = ({ id, title, views, likes, created, comments }: MyPostRowProps) => {
  return (
    <div className="flex w-full justify-between border-b border-gray-200 px-2 py-[1.125rem] text-center">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-12 text-sm text-gray-500">{id}</div>
          <div className="flex items-center gap-1.5">
            <div className="text-md font-semibold text-gray-800 hover:underline">{title}</div>
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
