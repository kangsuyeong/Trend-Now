'use client';

import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';
import { Bar, Down, Up } from './icons';
import { axiosRealtimeTop10, SSE } from '@/shared/api';
import { Top10, RankChangeType, RealtimeTop10Response, SignalKeyword } from '@/shared/types';
import dayjs from 'dayjs';

export default function TrendBar() {
  const [top10, setTop10] = useState<SignalKeyword>();
  const today = new Date(Date.now());

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('signalKeywordList', (e) => {
      const data: SignalKeyword = JSON.parse(e.data);
      setTop10({ now: Number(data.now), top10WithDiff: data.top10WithDiff });
    });
  }, []);

  useEffect(() => {
    (async () =>
      await axiosRealtimeTop10<RealtimeTop10Response>().then((res) =>
        setTop10({ now: Number(res.now), top10WithDiff: res.top10 })
      ))();
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
              <Top10Row
                key={item.keyword}
                rank={item.rank}
                keyword={item.keyword}
                rankChangeType={item.rankChangeType}
                previousRank={item.previousRank}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const Top10Row = memo(function Row({ rank, keyword, rankChangeType, previousRank }: Top10) {
  return (
    <div className="flex cursor-pointer justify-between rounded-xl py-2 pr-3 hover:bg-white/[16%] hover:pl-3">
      <div className="flex min-w-0 items-center gap-x-3">
        <span className="h-7 w-7 text-center text-xl font-semiBold text-white">{rank}</span>
        <span className="flex-1 truncate text-lg font-semiBold text-white">{keyword}</span>
      </div>
      {previousRank ? (
        rankChangeType === RankChangeType.UP ? (
          <div className="flex items-center gap-x-0.5">
            <Up />
            <span className="text-base font-medium text-white">
              {Math.abs(previousRank - rank)}
            </span>
          </div>
        ) : rankChangeType === RankChangeType.DOWN ? (
          <div className="flex items-center gap-x-0.5">
            <Down />
            <span className="text-base font-medium text-[#1056AC]">
              {Math.abs(previousRank - rank)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-x-0.5">
            <Bar />
          </div>
        )
      ) : (
        <div className="flex items-center gap-x-0.5">
          <span className="text-base font-medium text-white">NEW</span>
        </div>
      )}
    </div>
  );
});

Top10Row.displayName = 'Top10Row';
