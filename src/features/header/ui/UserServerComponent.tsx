import User from '@/features/header/ui/User';
import { axiosUserProfile } from '@/shared/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function UserServerComponent() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  await queryClient.prefetchQuery({
    queryKey: ['userInfo'],
    queryFn: () => axiosUserProfile(cookieStore.toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <User />
    </HydrationBoundary>
  );
}
