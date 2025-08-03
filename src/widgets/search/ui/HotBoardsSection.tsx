'use client';

import { HotBoardSearchList, SearchSectionTitle } from '@/entities/search';
import { axiosSearchRealtimeBoards } from '@/shared/api';
import type { SearchRealtimeBoardsResponse } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

interface HotBoardsSectionProps {
  keyword: string;
}

const HotBoardsSection = ({ keyword }: HotBoardsSectionProps) => {
  const { data: boards } = useQuery({
    queryKey: ['SearchRealtimeBoards', keyword],
    queryFn: () => axiosSearchRealtimeBoards<SearchRealtimeBoardsResponse>(keyword),
    select: (data) => data.searchResult,
  });
  if (!boards) return;

  return (
    <section aria-label="실시간 인기 게시판 목록" className="flex flex-col gap-y-5">
      <SearchSectionTitle title="실시간 인기 게시판" count={boards.length} />
      <HotBoardSearchList boards={boards} />
    </section>
  );
};

export default HotBoardsSection;
