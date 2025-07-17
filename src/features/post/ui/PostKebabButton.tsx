'use client';

import { useParams, useRouter } from 'next/navigation';
import { Delete, Write } from './icons';
import { Dropdownmenu, Kebab32 } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosDeletePost } from '@/shared/api';
import { BOARD_MAP } from '@/shared/constants';
import type { BoardType } from '@/shared/types';

export default function PostKebabButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { board, postId } = useParams();
  const boardId = BOARD_MAP[board as BoardType].id;

  const { mutate: deletePost } = useMutation({
    mutationFn: ({ boardId, postId }: { boardId: number; postId: number }) =>
      axiosDeletePost(boardId, postId),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['posts', boardId, 1],
      });
      router.push(`/${board}`);
    },
    onError: () => {
      alert('삭제 실패');
    },
  });

  // 편집 로직
  const handleEdit = () => {
    router.push(`/${board}/post/${postId}/edit`);
  };

  // 삭제 로직
  const handleDelete = () => {
    deletePost({ boardId, postId: Number(postId as string) });
  };
  return (
    <Dropdownmenu
      trigger={
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
          <Kebab32 className="text-gray-500" />
        </span>
      }
      items={[
        {
          content: (
            <>
              <Write />
              <span>게시글 수정</span>
            </>
          ),
          onClick: handleEdit,
        },
        {
          content: (
            <>
              <Delete />
              <span className="text-negative">게시글 삭제</span>
            </>
          ),
          onClick: handleDelete,
        },
      ]}
    />
  );
}
