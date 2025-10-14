import { HotBoardList } from '@/entities/hotBoard';
import { DateDivider } from '@/shared/ui';
import { AdvCarousel, SortChip, SortChipItem } from '@/widgets/hotBoards';
// import Image from 'next/image';

export default function Home() {
  const ads = ['/images/ads/ad1.png', '/images/ads/ad2.png'];

  return (
    <div className="flex flex-col gap-y-12 border-r border-gray-200 bg-white pr-8">
      <AdvCarousel images={ads} />
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
    </div>
  );
}
