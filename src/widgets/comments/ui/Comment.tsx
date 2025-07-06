import { UserProfile24 } from '@/shared/ui';
import React from 'react';
import Reply from './Reply';
import { CommentKebabButton } from '@/features/post';
import { ReplyList } from '@/shared/types';
import dayjs from 'dayjs';

interface CommentProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} commentId 댓글 아이디 */
  commentId: number;
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
  /**@param {() => void} refetch 댓글 목록을 다시 불러오는 함수 */
  refetch: () => void;
}

export default function Comment({
  boardId,
  postId,
  commentId,
  showMenu = false,
  userName,
  date,
  content,
  replies,
  refetch,
}: CommentProps) {
  return (
    <div className="flex flex-col gap-y-4 py-5">
      <div className="flex items-center justify-between">
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
        <span>
          {showMenu && (
            <CommentKebabButton
              boardId={boardId}
              postId={postId}
              commentId={commentId}
              refetch={refetch}
            />
          )}
        </span>
      </div>
      <div className="flex flex-col divide-y divide-gray-200 rounded-2xl bg-[#EEF3F5] px-5">
        {replies &&
          replies.map((item, idx) => (
            <Reply
              key={idx}
              userName={'사용자 이름'}
              date={item.createdAt}
              content={item.content}
            />
          ))}
      </div>
    </div>
  );
}
