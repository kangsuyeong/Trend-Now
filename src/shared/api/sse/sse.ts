import { getSHA256 } from '@/shared/lib';

export class SSE {
  private static instance: SSE;
  private static eventSource: EventSource;
  private static clientId: string;

  private constructor() {
    const clientId = getSHA256(String(new Date().getMilliseconds()));

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/subscribe?clientId=${clientId}`
    );

    eventSource.onopen = () => {
      console.log('SSE connection is ready');
    };

    eventSource.onerror = (err) => {
      console.log(err);
      eventSource.close();
    };

    SSE.eventSource = eventSource;
    SSE.clientId = clientId;
  }

  static getInstance() {
    if (!SSE.eventSource) {
      SSE.instance = new SSE();
    }

    return SSE.instance;
  }

  getEventSource() {
    return { eventSource: SSE.eventSource, clientId: SSE.clientId };
  }
}
