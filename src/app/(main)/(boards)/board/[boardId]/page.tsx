import { getQueryClient } from '@/providers/queryClient';
import { axiosPosts } from '@/shared/api';
import { BOARD_PAGE_SIZE } from '@/shared/constants';
import { Board } from '@/views/boards';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const queryClient = getQueryClient();
  const { boardId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['posts', Number(boardId), 1],
    queryFn: () => axiosPosts(Number(boardId), 1, BOARD_PAGE_SIZE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Board boardId={Number(boardId)} />
    </HydrationBoundary>
  );
}
