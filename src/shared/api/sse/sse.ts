import { getSHA256 } from '@/shared/lib';
import { SSEProps } from '@/shared/types';

export class SSE {
  private static eventSource: EventSource;
  private static clientId: string;

  private static init({ onKeywordList }: SSEProps) {
    const clientId = getSHA256(String(new Date().getMilliseconds()));

    console.log('clientId: ', clientId);

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/subscribe?clientId=${clientId}`
    );

    eventSource.onopen = () => {
      console.log('SSE connection is ready');
    };

    eventSource.onmessage = (e) => {
      console.log(e);
    };

    eventSource.onerror = (err) => {
      console.log(err);
      eventSource.close();
    };

    eventSource.addEventListener('signalKeywordList', (e) => onKeywordList?.(JSON.parse(e.data)));

    SSE.eventSource = eventSource;
    SSE.clientId = clientId;
  }

  static getInstance({ onKeywordList }: SSEProps) {
    if (!SSE.eventSource) {
      SSE.init({ onKeywordList });
    }

    return { eventSource: SSE.eventSource, clientId: SSE.clientId };
  }
}
