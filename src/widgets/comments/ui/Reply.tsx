import { CommentKebabButton } from '@/features/post';
import { ReplyList } from '@/shared/types';
import { UserProfile24 } from '@/shared/ui';
import dayjs from 'dayjs';
import React from 'react';

interface ReplyProps {
  /**@param {boolean} showMenu 댓글 수정 삭제 메뉴 표시 여부  */
  showMenu?: boolean;
  /**@param {string} userName 유저 표시명  */
  userName: string;
  /**@param {string} date 작성 날짜  */
  date: string;
  /**@param {string} content 댓글 내용  */
  content: string;
  /**@param {ReplyList[]} replies 답글 리스트  */
  replies?: ReplyList[];
}

export default function Reply({ showMenu = false, userName, date, content }: ReplyProps) {
  return (
    <div className="flex w-full items-center justify-between py-5">
      <span className="flex flex-col gap-y-0.5">
        <span className="flex items-center gap-x-4">
          <span className="flex items-center gap-x-2">
            <UserProfile24 />
            <span className="text-xs font-medium text-gray-500">{userName}</span>
          </span>
          <span className="text-sm font-regular text-gray-400">
            {dayjs(date).format('YYYY.MM-DD HH:mm')}
          </span>
        </span>
        <span className="pl-8 text-md font-medium text-gray-800">{content}</span>
      </span>
      <span>{showMenu && <CommentKebabButton boardId={0} postId={0} commentId={0} />}</span>
    </div>
  );
}
