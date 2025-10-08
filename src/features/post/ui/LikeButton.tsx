import { RequireLoginModal } from '@/features/login';
import { axiosLike } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { PostLikeResponse } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

interface LikeToggleButtonProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {boolean} liked 좋아요 여부 */
  liked: boolean;
}

export default function LikeToggleButton({ postId, boardId, liked }: LikeToggleButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const { mutate } = useMutation({
    mutationFn: () => axiosLike<PostLikeResponse>(boardId, postId),
    onSuccess: (res) => {
      if (res.postLikesAction === 'LIKED') {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    },
    onError: (e) => {
      if (!(e instanceof AxiosError))
        throw new InternalServerError(
          '게시글을 좋아요 하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );

      if (e.response?.status === 401) {
        setIsLoginModalOpen(true);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return (
    <>
      <input
        type="checkbox"
        checked={isLiked}
        onChange={() => {
          mutate();
        }}
        className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_heart_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_heart_active_28x28.svg')]"
      />
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
