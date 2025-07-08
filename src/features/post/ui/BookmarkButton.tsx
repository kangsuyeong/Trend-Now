import { axiosScrapPost } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { PostScrapResponse } from '@/shared/types';
import React, { useState } from 'react';

interface BookmarkButtonProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
}

export default function BookmarkButton({ postId, boardId }: BookmarkButtonProps) {
  const [isScraped, setIsScraped] = useState<boolean>(false);

  const handlePostScrap = async () => {
    try {
      const result = await axiosScrapPost<PostScrapResponse>(boardId, postId);

      if (result.scrapAction === 'SCRAPPED') {
        setIsScraped(true);
      } else {
        setIsScraped(false);
      }
    } catch {
      throw new InternalServerError(
        '게시글을 북마크하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
  };

  return (
    <input
      type="checkbox"
      checked={isScraped}
      onChange={(e) => {
        e.preventDefault();
        handlePostScrap();
      }}
      className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_bookmark_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_bookmark_active_24x24.svg')]"
    />
  );
}
