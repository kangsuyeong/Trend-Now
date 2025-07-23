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
      <HotPostsSection keyword={keyword} />
      <FixedBoardsSection keyword={keyword} />
    </div>
  );
}
