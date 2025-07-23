import { SearchHeader } from '@/entities/search';
import { FixedBoardsSection, HotBoardsSection, HotPostsSection } from '@/widgets/search/ui';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  return (
    <div className="flex flex-col gap-10">
      <SearchHeader keyword={keyword} />
      <HotBoardsSection keyword={keyword} />
      <div className="h-2 bg-gray-100" />
      <HotPostsSection keyword={keyword} />
      <div className="h-2 bg-gray-100" />
      <FixedBoardsSection keyword={keyword} />
    </div>
  );
}
