'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Delete, Write } from './icons';
import { Kebab32 } from '@/shared/ui';
import { useUserStore } from '@/shared/store';
import { axiosDeleteComment } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';

interface WriteCommentProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} commentId 댓글 아이디 */
  commentId: number;
  /**@param {() => void} refetch 댓글 목록을 다시 불러오는 함수 */
  refetch: () => void;
  /**@param {() => void} onEditClick 수정 버튼 클릭 시 실행되는 함수 */
  onEditClick: () => void;
}

export default function CommentKebabButton({
  boardId,
  postId,
  commentId,
  refetch,
  onEditClick,
}: WriteCommentProps) {
  const { jwt } = useUserStore();

  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const dropMenuButtonRep = useRef<HTMLSpanElement>(null);
  const dropMenuRep = useRef<HTMLSpanElement>(null);

  const handleDropMenuToggle = () => {
    setDropMenuOpen((prev) => {
      return !prev;
    });
  };

  const handleDeleteComment = async () => {
    const yn = confirm('정말 댓글을 삭제하시겠습니까?');

    if (yn) {
      if (jwt) {
        const result = await axiosDeleteComment<boolean>(jwt, boardId, postId, commentId)
          .then(() => true)
          .catch((err) => {
            console.error(err);

            return false;
          });

        if (result) {
          refetch();
        } else {
          throw new InternalServerError('댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    }
  };

  useEffect(() => {
    const handleDropMenuClose = (e: MouseEvent) => {
      if (
        dropMenuOpen &&
        !dropMenuButtonRep.current?.contains(e.target as Node) &&
        !dropMenuRep.current?.contains(e.target as Node)
      ) {
        setDropMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDropMenuClose);
    return () => {
      document.removeEventListener('click', handleDropMenuClose);
    };
  }, [dropMenuOpen]);

  return (
    <span className="relative select-none">
      <span
        ref={dropMenuButtonRep}
        onClick={handleDropMenuToggle}
        className="flex cursor-pointer rounded-lg hover:bg-gray-200"
      >
        <Kebab32 />
      </span>
      {dropMenuOpen && (
        <span
          ref={dropMenuRep}
          className="absolute right-0 z-10 mt-2 flex h-fit w-[12.5rem] flex-col gap-y-1 rounded-[1.25rem] bg-white p-4 shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.08)]"
        >
          <span
            className="flex h-11 w-full cursor-pointer items-center gap-x-1.5 rounded-xl p-2 text-md font-medium text-gray-800 hover:bg-gray-100"
            onClick={onEditClick}
          >
            <Write /> <span>댓글 수정</span>
          </span>
          <span
            className="flex h-11 w-full cursor-pointer items-center gap-x-1.5 rounded-xl p-2 text-md font-medium text-negative hover:bg-gray-100"
            onClick={handleDeleteComment}
          >
            <Delete /> <span>댓글 삭제</span>
          </span>
        </span>
      )}
    </span>
  );
}
