import { Top10 } from './sse';

export interface RealtimeTop10Response {
  now: string;
  top10: Top10[];
}
