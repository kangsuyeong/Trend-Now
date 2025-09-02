'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Delete, Write } from './icons';
import { DropdownMenu, DropdownMenuItem, Kebab32 } from '@/shared/ui';
import { useState } from 'react';
import PostDeleteModal from './PostDeleteModal';

export default function PostKebabButton() {
  const router = useRouter();
  const pathname = usePathname();
  const boardId = useParams().boardId!;
  const postId = useParams().postId!;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const boardPrefix = pathname.split('/')[1];

  // 편집 로직
  const handleEdit = () => {
    router.push(`/${boardPrefix}/${boardId}/post/${postId}/edit`);
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
        boardId={+boardId}
        postId={+postId}
        boardPrefix={boardPrefix}
      />
    </>
  );
}
