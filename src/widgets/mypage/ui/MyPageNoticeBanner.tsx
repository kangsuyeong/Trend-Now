import { ChevronRight24 } from '@/shared/ui';
import Image from 'next/image';
import React from 'react';

const MyPageNoticeBanner = () => {
  return (
    <div className="flex h-14 items-center justify-between rounded-2xl bg-brand-100 px-4">
      <div className="flex items-center gap-[0.375rem]">
        <Image src="/images/crown.gif" alt="gold" width={32} height={32} />
        <div className="text-md font-medium text-[#333333]">
          더 많은 실시간 인기 검색어를 확인해보세요!
        </div>
      </div>
      <ChevronRight24 />
    </div>
  );
};

export default MyPageNoticeBanner;
