'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { axiosRealtimeTop10, SSE } from '@/shared/api';
import { SignalKeyword } from '@/shared/types';
import dayjs from 'dayjs';
import TrendBarRow from './TrendBarRow';

export default function TrendBar() {
  const [top10, setTop10] = useState<SignalKeyword>();
  const today = new Date(Date.now());

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('signalKeywordList', (e) => {
      const data: SignalKeyword = JSON.parse(e.data);
      setTop10(data);
    });
  }, []);

  useEffect(() => {
    (async () => await axiosRealtimeTop10<SignalKeyword>().then((res) => setTop10(res)))();
  }, []);

  return (
    <div className="sticky top-[104px] flex h-fit w-full flex-col gap-y-5 rounded-3xl bg-brand-500 p-5">
      <div className="flex flex-col gap-y-6">
        <span className="flex w-fit flex-col gap-y-1.5">
          <span className="text-lg font-semiBold text-brand-100">
            가장 뜨거운 실시간 인기 검색어
          </span>
          <span className="flex w-fit items-center gap-x-1.5">
            <Image
              src="/images/crown.gif"
              alt="trend"
              width={58}
              height={58}
              unoptimized
              className="aspect-square object-cover"
            />
            <span className="font-himpun text-[2.75rem]/[120%] text-white">TOP 10</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex h-10 items-center rounded-xl bg-black/[0.16] px-3 py-2 text-md font-medium text-white">
          {dayjs(today).format('YYYY.MM.DD HH:mm 기준')}
        </div>
        <div className="flex flex-col gap-y-1 rounded-[1.25rem] bg-white/[8%] p-3">
          {top10 &&
            top10.top10WithDiff?.map((item) => (
              <TrendBarRow
                key={item.keyword}
                boardId={item.boardId}
                rank={item.rank}
                keyword={item.keyword}
                rankChangeType={item.rankChangeType}
                diffRank={item.diffRank}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
