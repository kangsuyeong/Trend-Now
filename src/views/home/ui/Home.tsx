'use client';

import { HotBoardList } from '@/entities/hotBoard';
import { DateDivider } from '@/shared/ui';
import { SortChip, SortChipItem } from '@/widgets/hotBoards';
import Image from 'next/image';

export default function Home() {
  // const ads = ['/images/ad1.png', '/images/ad1.png', '/images/ad1.png'];

  return (
    <div className="flex flex-col gap-y-12 border-r border-gray-200 bg-white pr-8">
      <div className="relative flex h-fit w-full flex-col items-center gap-y-3 px-8 pb-6 pt-8">
        <Image
          src="/images/banner.gif"
          alt="배너 이미지"
          fill
          sizes="100%"
          priority
          unoptimized
          className="rounded-[1.25rem] object-cover"
        />
        <span className="z-10 w-fit select-none text-base font-semiBold text-white">
          🔥 지금 떠오른 이슈들, 사라지기 전에 확인하세요.
        </span>
        <span className="z-10 w-fit select-none font-himpun text-[3.5rem]/[120%] font-regular text-brand-500">
          04 : 11 : 42
        </span>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-y-1.5">
              <span className="text-base font-regular text-gray-500">
                시간이 지나면 사라지는 실시간 게시판, 지금 참여하세요!
              </span>
              <span className="text-3xl font-bold text-gray-800">실시간 인기 게시판</span>
            </div>
            <SortChip size="desktop" defaultText="타이머 순">
              <SortChipItem text="타이머 순" value="timer" />
            </SortChip>
          </div>
        </div>
        <HotBoardList />
      </div>
      {/* <div>
        <AdvCarousel images={ads} />
      </div> */}
    </div>
  );
}
