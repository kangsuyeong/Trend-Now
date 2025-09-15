import { Top10 } from '@/shared/types';
import Link from 'next/link';
import TrendBarRowType from './TrendBarRowType';

export default function TrendBarRow({ boardId, rank, keyword, rankChangeType, diffRank }: Top10) {
  return (
    <Link href={`/hotboard/${boardId}`}>
      <div className="flex cursor-pointer justify-between rounded-xl py-2 pr-3 hover:bg-white/[16%] hover:pl-3">
        <div className="flex min-w-0 items-center gap-x-3">
          <span className="h-7 w-7 text-center text-xl font-semiBold text-white">{rank}</span>
          <span className="flex-1 truncate text-lg font-semiBold text-white">{keyword}</span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <TrendBarRowType rankChangeType={rankChangeType} diffRank={diffRank} />
        </div>
      </div>
    </Link>
  );
}
