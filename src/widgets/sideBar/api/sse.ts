import { EventSource, ErrorEvent } from 'eventsource';

interface SSEProps<T> {
  onConnect?: (data: T) => void;
  onMessage?: (data: T) => void;
  onExpired?: (data: T) => void;
  onError?: (err: ErrorEvent) => void;
}

export const connectSSE = async <T>({ onConnect, onMessage, onExpired, onError }: SSEProps<T>) => {
  const eventSource = new EventSource(
    `http://13.124.181.116:8080/api/v1/subscribe?clientId=${new Date().getMilliseconds()}`
  );

  eventSource.onopen = () => {
    console.log(eventSource.readyState);
  };

  eventSource.addEventListener('subscribe', (e) => onConnect?.(JSON.parse(e.data)));

  eventSource.addEventListener('signalKeywordList', (e) => onMessage?.(JSON.parse(e.data)));

  eventSource.addEventListener('realtimeBoardExpired', (e) => onExpired?.(JSON.parse(e.data)));

  eventSource.onerror = (err) => {
    onError?.(err);
    eventSource.close();
  };

  return eventSource;
};
