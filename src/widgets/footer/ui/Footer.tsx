import { TrendnowWhite } from '@/shared/ui';
import React from 'react';

export default function Footer() {
  return (
    <footer className="mx-auto flex h-fit max-w-[1248px] justify-center rounded-t-[2rem] bg-gray-900 px-10 pb-16 pt-8">
      <div className="flex w-full justify-between">
        <span className="flex flex-col gap-y-3">
          <TrendnowWhite />
          <span className="text-base font-medium text-gray-400">트렌드나우</span>
        </span>
        <span className="text-sm font-regular text-gray-400">
          Copyright © 2025 Trendnow. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
