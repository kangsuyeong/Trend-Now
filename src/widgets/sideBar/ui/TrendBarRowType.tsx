import { RankChangeType } from '@/shared/types';
import { Up, Down, Bar } from './icons';

interface TrendBarRowTypeProps {
  /**@param {RankChangeType} rankChangeType 키워드의 순위 변동 유형 */
  rankChangeType: RankChangeType;
  /**@param {number} diffRank 키워드의 순위 변동 크기 */
  diffRank: number;
}

export default function TrendBarRowType({ rankChangeType, diffRank }: TrendBarRowTypeProps) {
  switch (rankChangeType) {
    case RankChangeType.UP:
      return (
        <>
          <Up />
          <span className="text-base font-medium text-white">{diffRank}</span>
        </>
      );
    case RankChangeType.DOWN:
      return (
        <>
          <Down />
          <span className="text-base font-medium text-[#1056AC]">{diffRank}</span>
        </>
      );
    case RankChangeType.SAME:
      return (
        <>
          <Bar />
        </>
      );
    case RankChangeType.NEW:
      return (
        <>
          <span className="flex h-6 items-center rounded-lg bg-white/[16%] px-2 text-2xs font-semiBold text-white">
            NEW
          </span>
        </>
      );
  }
}
