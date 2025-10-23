'use client';

import { ScrapFilledIcon } from '@/features/mypage/icons';
import { useState } from 'react';
import { cn } from '@/shared/lib/';
import { axiosScrapPost } from '@/shared/api';
import { PostScrapResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequireLoginModal } from '@/features/login';
import { AxiosError } from 'axios';
import { InternalServerError } from '@/shared/error/error';

interface ScrapToggleButtonProps {
  /**@param {number} buttonSize 사이즈 */
  size: 's' | 'm';
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
}

const sizeMap = {
  s: { button: 'w-6 h-6 rounded-md', icon: 24 },
  m: { button: 'w-10 h-10 rounded-lg', icon: 28 },
};

const ScrapCancelButton = ({ size, boardId, postId }: ScrapToggleButtonProps) => {
  const queryClient = useQueryClient();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { button, icon } = sizeMap[size];

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myscraps'] }),
    onError: (e) => {
      if (!(e instanceof AxiosError))
        throw new InternalServerError(
          '북마크를 취소하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );

      if (e.code === '401') {
        setIsLoginModalOpen(true);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleScrap = () => {
    mutate();
  };

  return (
    <>
      <button
        onClick={handleScrap}
        className={cn('flex items-center justify-center border border-brand-500', button)}
      >
        <ScrapFilledIcon size={icon} />
      </button>
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default ScrapCancelButton;
