import Image from 'next/image';
import React from 'react';

export default function TrendBar() {
  return (
    <div className="flex flex-col gap-y-7 rounded-3xl bg-brand-500 p-5">
      <div className="flex flex-col gap-y-6">
        <span className="w-fit rounded-xl bg-gray-800 px-3 py-1.5 text-base font-medium text-white">
          2025년 03월 16일
        </span>
        <span className="flex w-fit flex-col gap-y-1.5">
          <span className="text-lg font-semiBold text-brand-100">
            가장 뜨거운 실시간 인기 검색어
          </span>
          <span className="flex w-fit items-end gap-x-1.5">
            <span className="relative h-[3.625rem] w-[3.625rem]">
              <Image src="/images/crown.gif" alt="trend" fill />
            </span>
            <span className="font-himpun text-[2.75rem]/[120%] text-white">TOP 10</span>
          </span>
        </span>
      </div>
    </div>
  );
}
