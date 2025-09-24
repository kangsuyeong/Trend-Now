'use client';

import { RequireLoginModal } from '@/features/login';
import { axiosScrapPost } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { PostScrapResponse } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';

interface BookmarkButtonProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
  /**@param {boolean} scraped 북마크 여부 */
  scraped: boolean;
}

export default function ScrapToggleButton({ postId, boardId, scraped }: BookmarkButtonProps) {
  const [isScraped, setIsScraped] = useState<boolean>(scraped);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: (res) => {
      if (res.scrapAction === 'SCRAPPED') {
        setIsScraped(true);
      } else {
        setIsScraped(false);
      }
    },
    onError: (e) => {
      if (!(e instanceof AxiosError))
        throw new InternalServerError(
          '게시글을 북마크하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );

      if (e.code === '401') {
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
        checked={isScraped}
        onChange={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_bookmark_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_bookmark_active_24x24.svg')]"
      />
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
