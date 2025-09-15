import { RankChangeType } from './sseEnums';
import { ErrorEvent } from 'eventsource';

export interface Top10 {
  boardId: number;
  rank: number;
  keyword: string;
  rankChangeType: RankChangeType;
  diffRank: number;
}

export interface SignalKeyword {
  now: number;
  top10WithDiff: Top10[];
}

export interface BoardTimeUp {
  boardName: string;
  timeUp: number;
}

export interface SSEProps {
  /**@param {(data: SignalKeyword) => void} onKeywordList signalKeywordList로부터 이벤트가 도착했을 때 실행하는 함수 */
  onKeywordList?: (data: SignalKeyword) => void;
  /**@param {(data: BoardTimeUp) => void} onTimeUp realtimeBoardTimeUp로부터 이벤트가 도착했을 때 실행하는 함수 */
  onTimeUp?: (data: BoardTimeUp) => void;
  /**@param {(err: ErrorEvent) => void} onError 에러 발생 시 실행하는 함수 */
  onError?: (err: ErrorEvent) => void;
}
