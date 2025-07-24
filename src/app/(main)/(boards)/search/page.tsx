import { SearchHeader } from '@/entities/search';
import { FixedBoardsSection, HotBoardsSection, HotPostsSection } from '@/widgets/search/ui';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  return (
    <main className="flex flex-col gap-10 border-r border-gray-200 pr-8">
      <SearchHeader keyword={keyword} />
      <HotBoardsSection keyword={keyword} />
      <hr className="h-2 bg-gray-100" />
      <HotPostsSection keyword={keyword} />
      <hr className="h-2 bg-gray-100" />
      <FixedBoardsSection keyword={keyword} />
    </main>
  );
}
