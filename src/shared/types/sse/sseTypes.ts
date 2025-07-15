import { RankChangeType } from './sseEnums';

export interface SignalKeyword {
  now: number;
  top10WithDiff: Top10[];
}

export interface Top10 {
  rank: number;
  keyword: string;
  rankChangeType: RankChangeType;
  previousRank?: number;
}
