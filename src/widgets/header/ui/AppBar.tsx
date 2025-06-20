'use client';

import React, { useState } from 'react';
import { Search24, Trendnow } from '@/shared/ui/';
import Link from 'next/link';
import { User } from '@/features/header';

const Appbar = () => {
  const [keyword, setKeyword] = useState<string>();

  return (
    <header className="flex h-20 w-full items-center justify-center border-b border-gray-200">
      <div className="mx-8 flex w-[1248px] justify-between">
        <Link href={`/home`}>
          <span className="flex cursor-pointer items-center">
            <Trendnow />
          </span>
        </Link>
        <span className="flex h-full w-[28.75rem] items-center justify-between rounded-full border border-gray-200 bg-gray-100 has-[:focus]:border-gray-400">
          <input
            type="search"
            placeholder="원하는 검색어를 입력해주세요."
            className="w-full bg-transparent px-5 py-2.5 text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className="px-5 py-2.5">
            <Search24
              className={keyword && keyword.length > 0 ? 'fill-gray-900' : 'fill-gray-400'}
            />
          </span>
        </span>
        <User />
      </div>
    </header>
  );
};

export default Appbar;
