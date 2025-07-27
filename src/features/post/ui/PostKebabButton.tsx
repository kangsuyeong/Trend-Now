'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Delete, Write } from './icons';
import { DropdownMenu, DropdownMenuItem, Kebab32 } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosDeletePost } from '@/shared/api';

export default function PostKebabButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const boardId = useParams().boardId!;
  const postId = useParams().postId!;

  const boardPrefix = pathname.split('/')[1];

  const { mutate: deletePost } = useMutation({
    mutationFn: ({ boardId, postId }: { boardId: number; postId: number }) =>
      axiosDeletePost(boardId, postId),
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

  // 편집 로직
  const handleEdit = () => {
    router.push(`/${boardPrefix}/${boardId}/post/${postId}/edit`);
  };

  // 삭제 로직
  const handleDelete = () => {
    deletePost({ boardId: Number(boardId), postId: Number(postId) });
  };
  return (
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
      <DropdownMenuItem onClick={handleDelete} className="text-negative">
        <Delete />
        게시물 삭제
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
