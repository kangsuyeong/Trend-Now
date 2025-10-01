import { axiosPost } from '@/shared/api';
import type { PostDetailResponse } from '@/shared/types';
import { Post } from '@/views/post';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const { boardId, postId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['postDetail', Number(boardId), Number(postId)],
    queryFn: () =>
      axiosPost<PostDetailResponse>(Number(boardId), Number(postId), cookieStore.toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post postId={Number(postId)} boardId={Number(boardId)} />
    </HydrationBoundary>
  );
}
