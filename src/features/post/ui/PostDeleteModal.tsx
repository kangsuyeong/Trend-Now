'use client';

import { axiosDeletePost } from '@/shared/api';
import { Modal, PrimaryButton } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PostDeleteModalProps {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {number} boardId 게시판 ID*/
  boardId: number;
  /**@param {number} postId 게시글 ID*/
  postId: number;
  /**@param {string} boardPrefix 게시글 삭제 후 이동할 pathname */
  boardPrefix: string;
  /**@param {() => void} onClose 모달을 닫을 시 실행하는 함수 */
  onClose: () => void;
}

export default function PostDeleteModal({
  open,
  boardId,
  postId,
  boardPrefix,
  onClose,
}: PostDeleteModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deletePost } = useMutation({
    mutationFn: () => axiosDeletePost(boardId, postId),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['posts', boardId, 1],
      });
      router.push(`/${boardPrefix}/${boardId}`);
    },
    onError: () => {
      alert('삭제 실패');
    },
  });

  // 삭제 로직
  const handleDelete = () => {
    deletePost();
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <span className="flex h-fit w-[420px] flex-col gap-y-6 rounded-3xl bg-white p-6">
        <span className="flex w-full flex-col gap-y-3 py-4">
          <span className="text-center text-xl font-bold text-gray-900">
            게시글을 삭제하시겠습니까?
          </span>
          <span className="text-center text-sm font-regular text-gray-500">
            게시글을 삭제하시면 다시 복구할 수 없습니다.
          </span>
        </span>
        <span className="flex w-full justify-center gap-x-3">
          <PrimaryButton variant="gray" size="l" className="w-full" onClick={onClose}>
            닫기
          </PrimaryButton>
          <PrimaryButton variant="error" size="l" className="w-full" onClick={handleDelete}>
            삭제
          </PrimaryButton>
        </span>
      </span>
    </Modal>
  );
}
