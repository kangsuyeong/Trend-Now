import { RankChangeType } from '.';

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
