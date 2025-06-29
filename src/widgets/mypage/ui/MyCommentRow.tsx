import React from 'react';

interface MyCommentRowProps {
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {string} comment 댓글 */
  comment: string;
  /**@param {Date} created 일자 */
  created: Date;
}

const MyCommentRow = ({ title, created, comment }: MyCommentRowProps) => {
  const month = created.getMonth() + 1;
  const date = created.getDate();
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-2 py-4">
      <div className="flex flex-col gap-1">
        <div className="text-xs font-medium text-brand-500">{title}</div>
        <div className="text-md font-semibold text-gray-800 hover:underline">{comment}</div>
      </div>

      <div className="w-12 text-center text-sm font-regular text-gray-500">
        {month.toString().padStart(2, '0')}.{date.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default MyCommentRow;
