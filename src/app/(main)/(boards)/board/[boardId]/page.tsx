import { getQueryClient } from '@/providers/queryClient';
import { axiosPosts } from '@/shared/api';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { Board } from '@/views/boards';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ boardId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const queryClient = getQueryClient();
  const { boardId } = await params;
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1);

  await queryClient.prefetchQuery({
    queryKey: ['posts', Number(boardId), pageNum],
    queryFn: () => axiosPosts(Number(boardId), pageNum, BOARD_PAGE_SIZE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Board boardId={Number(boardId)} />
    </HydrationBoundary>
  );
}
