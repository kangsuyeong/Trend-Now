import { PrimaryButton, UserProfile24 } from '@/shared/ui';
import React, { useState } from 'react';
import Reply from './Reply';
import { CommentKebabButton } from '@/features/post';
import { ReplyList } from '@/shared/types';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { axiosEditComment } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';

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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentText, setCommentText] = useState(content);

  const { mutate } = useMutation({
    mutationFn: () => axiosEditComment<boolean>(boardId, postId, commentId, commentText),
    onSuccess: () => {
      refetch();
      setEditMode(false);
    },
    onError: () => {
      throw new InternalServerError('댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSaveComment = async () => {
    if (commentText.length === 0) {
      alert('댓글을 입력해주세요.');

      return;
    }

    mutate();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="flex flex-1 flex-col gap-y-0.5">
          <span className="flex items-center gap-x-4">
            <span className="flex items-center gap-x-2">
              <UserProfile24 />
              <span className="text-xs font-medium text-gray-500">{userName}</span>
            </span>
            <span className="text-sm font-regular text-gray-400">
              {dayjs(date).format('YYYY.MM-DD HH:mm')}
            </span>
          </span>
          {editMode ? (
            <div className="ml-8 flex flex-col gap-y-2 rounded-2xl border border-gray-300 bg-white p-4">
              <textarea
                value={commentText}
                onChange={handleCommentChange}
                placeholder="댓글을 작성해주세요."
                className="w-full resize-none text-md font-medium text-gray-800 field-sizing-content placeholder:text-gray-500 focus:outline-none"
              ></textarea>
              <div className="flex justify-end">
                <PrimaryButton
                  variant={commentText.length > 0 ? 'error' : 'gray'}
                  size="m"
                  disabled={!commentText}
                  onClick={handleSaveComment}
                >
                  수정 완료
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <span className="pl-8 text-md font-medium text-gray-800">{content}</span>
          )}
        </span>
        <span>
          {showMenu && !editMode && (
            <CommentKebabButton
              boardId={boardId}
              postId={postId}
              commentId={commentId}
              refetch={refetch}
              onEditClick={() => setEditMode(true)}
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
