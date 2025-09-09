import React, { useState } from 'react';
import { PrimaryButton } from '@/shared/ui';
import { CommentIcon } from '../icons';
import { axiosWriteComment } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { useMutation } from '@tanstack/react-query';
import { RequireLoginModal } from '@/features/login';
import { useUserStore } from '@/shared/store';

interface WriteCommentProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {() => void} refetch 댓글 목록을 다시 불러오는 함수 */
  refetch: () => void;
}

export default function WriteComment({ boardId, postId, refetch }: WriteCommentProps) {
  const { isAuthenticated } = useUserStore();

  const [commentText, setCommentText] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: () => axiosWriteComment<boolean>(boardId, postId, commentText),
    onSuccess: () => {
      refetch();
      setCommentText('');
    },
    onError: () => {
      throw new InternalServerError('댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const handleSaveComment = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    mutate();
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <span className="flex items-center gap-x-1.5">
          <CommentIcon />
          <span className="select-none text-md font-semiBold text-gray-800">댓글 작성</span>
        </span>
        <div className="flex flex-col gap-y-2 rounded-2xl border border-gray-300 bg-white p-4">
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="댓글을 작성해주세요."
            className="w-full resize-none text-md font-medium text-gray-800 field-sizing-content placeholder:text-gray-500 focus:outline-none"
          ></textarea>
          <div className="flex justify-end">
            <PrimaryButton
              variant={commentText.length > 0 ? 'black' : 'gray'}
              size="m"
              disabled={!commentText}
              onClick={handleSaveComment}
            >
              등록
            </PrimaryButton>
          </div>
        </div>
      </div>
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
