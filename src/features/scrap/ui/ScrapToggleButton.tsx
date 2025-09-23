'use client';

import { ScrapFilledIcon } from '@/features/scrap/icons';
import { useState } from 'react';
import { cn } from '@/shared/lib/';
import { axiosScrapPost } from '@/shared/api';
import { PostScrapResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequireLoginModal } from '@/features/login';

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

const ScrapToggleButton = ({ size, boardId, postId }: ScrapToggleButtonProps) => {
  const queryClient = useQueryClient();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { button, icon } = sizeMap[size];

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myscraps'] }),
    onError: () => setIsLoginModalOpen(true),
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

export default ScrapToggleButton;
