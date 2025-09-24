import { RequireLoginModal } from '@/features/login';
import { axiosScrapPost } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { PostScrapResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cva, VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';

const scrapButtonVariant = cva(
  'flex cursor-pointer appearance-none checked:border-brand-500 items-center justify-center border border-gray-200 before:content-[url("/images/icons/icon_bookmark_24x24.svg")] checked:before:content-[url("/images/icons/icon_bookmark_active_24x24.svg")]',
  {
    variants: {
      size: {
        40: 'h-10 w-10 before:h-6 before:w-6 rounded-lg',
        24: 'h-6 w-6 before:h-4.5 before:w-4.5 rounded-md',
      },
    },
  }
);

interface BookmarkButtonProps extends VariantProps<typeof scrapButtonVariant> {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
  /**@param {boolean} scraped 북마크 여부 */
  scraped: boolean;
}

export default function BookmarkButton({ postId, boardId, scraped, size }: BookmarkButtonProps) {
  const queryClient = useQueryClient();

  const [isScraped, setIsScraped] = useState<boolean>(scraped);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: (res) => {
      if (res.scrapAction === 'SCRAPPED') {
        setIsScraped(true);
      } else {
        setIsScraped(false);
        queryClient.invalidateQueries({ queryKey: ['myscraps'] });
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
        className={scrapButtonVariant({ size })}
      />
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
