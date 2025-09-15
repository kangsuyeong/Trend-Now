import { getQueryClient } from '@/providers/queryClient';
import { axiosPost } from '@/shared/api';
import { Post } from '@/views/post';
import type { PostDetailResponse } from '@/shared/types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const queryClient = getQueryClient();
  const { boardId, postId } = await params;
  await queryClient.prefetchQuery({
    queryKey: ['postDetail', Number(boardId), Number(postId)],
    queryFn: () => axiosPost<PostDetailResponse>(Number(boardId), Number(postId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post postId={Number(postId)} boardId={Number(boardId)} isHotBoard />
    </HydrationBoundary>
  );
}
