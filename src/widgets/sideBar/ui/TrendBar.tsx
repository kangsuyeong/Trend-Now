import Image from 'next/image';
import React, { memo } from 'react';
import { Bar, Down, Up } from './icons';
import { RankChangeType, SignalKeyword, Top10 } from '../model';

export default function TrendBar() {
  const today = new Date(top10.now);

  return (
    <div className="flex flex-col gap-y-7 rounded-3xl bg-brand-500 p-5">
      <div className="flex flex-col gap-y-6">
        <span className="w-fit rounded-xl bg-gray-800 px-3 py-1.5 text-base font-medium text-white">
          {`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`}
        </span>
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
              className="aspect-square object-cover"
            />
            <span className="font-himpun text-[2.75rem]/[120%] text-white">TOP 10</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-y-1 rounded-[1.25rem] bg-white/[8%] p-3">
        {top10.top10WithDiff.map((item) => (
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
  );
}

const Top10Row = memo(function Top10Row({ rank, keyword, rankChangeType, previousRank }: Top10) {
  return (
    <div className="flex cursor-pointer justify-between rounded-xl py-2 pr-3 hover:bg-white/[16%] hover:pl-3">
      <div className="flex gap-x-3">
        <span className="flex h-7 w-7 items-center justify-center text-xl font-semiBold text-white">
          {rank}
        </span>
        <span className="flex items-center justify-center text-lg font-semiBold text-white">
          {keyword}
        </span>
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

const top10: SignalKeyword = {
  now: 1742701507971,
  top10WithDiff: [
    {
      rank: 1,
      keyword: '강지용',
      rankChangeType: RankChangeType.UP,
      previousRank: 1,
    },
    {
      rank: 2,
      keyword: '프란치스코 교황 분향소',
      rankChangeType: RankChangeType.DOWN,
      previousRank: 2,
    },
    {
      rank: 3,
      keyword: '이철규',
      rankChangeType: RankChangeType.DOWN,
      previousRank: 3,
    },
    {
      rank: 4,
      keyword: '장가현 48세 수영장 헌팅',
      rankChangeType: RankChangeType.DOWN,
      previousRank: 4,
    },
    {
      rank: 5,
      keyword: '오윤아 발달장애 아들',
      rankChangeType: RankChangeType.UP,
      previousRank: 5,
    },
    {
      rank: 6,
      keyword: '한강버스 대비 훈련',
      rankChangeType: RankChangeType.NEW,
    },
    {
      rank: 7,
      keyword: '이혼숙려캠프',
      rankChangeType: RankChangeType.SAME,
      previousRank: 7,
    },
    {
      rank: 8,
      keyword: '올리브영',
      rankChangeType: RankChangeType.NEW,
    },
    {
      rank: 9,
      keyword: '트럼프 관세 인하',
      rankChangeType: RankChangeType.SAME,
      previousRank: 9,
    },
    {
      rank: 10,
      keyword: '권은비',
      rankChangeType: RankChangeType.UP,
      previousRank: 10,
    },
  ],
};
