import { RankChangeType } from './sseEnums';
import { ErrorEvent } from 'eventsource';

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

export interface SSEProps {
  /**@param {(data: SignalKeyword) => void} onKeywordList signalKeywordList로부터 이벤트가 도착했을 때 실행하는 함수 */
  onKeywordList?: (data: SignalKeyword) => void;
  onError?: (err: ErrorEvent) => void;
}
