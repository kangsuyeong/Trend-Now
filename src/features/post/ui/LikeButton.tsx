import { axiosLike } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

interface BookmarkButtonProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {boolean} liked 좋아요 여부 */
  liked: boolean;
}

export default function BookmarkButton({ postId, boardId, liked }: BookmarkButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  // boardName 삭제
  const { mutate } = useMutation({
    mutationFn: () => axiosLike(boardId, postId),
    onSuccess: (res) => {
      if (res) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    },
    onError: () => {
      throw new InternalServerError(
        '게시글을 북마크하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    },
  });

  return (
    <input
      type="checkbox"
      checked={isLiked}
      onChange={(e) => {
        e.preventDefault();
        mutate();
      }}
      className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_heart_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_heart_active_28x28.svg')]"
    />
  );
}
