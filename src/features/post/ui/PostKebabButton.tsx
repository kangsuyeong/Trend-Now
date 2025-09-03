'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Delete, Write } from './icons';
import { DropdownMenu, DropdownMenuItem, Kebab32, PostDeleteModal } from '@/shared/ui';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosDeletePost } from '@/shared/api';

export default function PostKebabButton() {
  const router = useRouter();
  const pathname = usePathname();
  const boardId = useParams().boardId!;
  const postId = useParams().postId!;

  const queryClient = useQueryClient();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const boardPrefix = pathname.split('/')[1];

  // 편집 로직
  const handleEdit = () => {
    router.push(`/${boardPrefix}/${boardId}/post/${postId}/edit`);
  };

  const { mutate: deletePost } = useMutation({
    mutationFn: () => axiosDeletePost(+boardId, +postId),
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

  return (
    <>
      <DropdownMenu
        trigger={
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
            <Kebab32 className="text-gray-500" />
          </span>
        }
      >
        <DropdownMenuItem onClick={handleEdit}>
          <Write />
          게시물 수정
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenDeleteModal(true)} className="text-negative">
          <Delete />
          게시물 삭제
        </DropdownMenuItem>
      </DropdownMenu>
      <PostDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        title="게시글을 삭제하시겠습니까?"
        message="게시글을 삭제하시면 다시 복구할 수 없습니다."
      />
    </>
  );
}
