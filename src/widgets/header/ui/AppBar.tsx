'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Hamburger24, Search24, Trendnow, UserProfile28, UserProfile32 } from '@/shared/ui/';

const Appbar = () => {
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const dropMenuButtonRep = useRef<HTMLSpanElement>(null);
  const dropMenuRep = useRef<HTMLSpanElement>(null);

  const handleDropMenuToggle = () => {
    setDropMenuOpen((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const handleDropMenuClose = (e: MouseEvent) => {
      if (
        dropMenuOpen &&
        !dropMenuButtonRep.current?.contains(e.target as Node) &&
        !dropMenuRep.current?.contains(e.target as Node)
      ) {
        setDropMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDropMenuClose);
    return () => {
      document.removeEventListener('click', handleDropMenuClose);
    };
  }, [dropMenuOpen]);

  return (
    <header className="flex h-20 w-full items-center justify-center border-b border-gray-200">
      <div className="mx-8 flex w-[1248px] justify-between">
        <span className="flex items-center">
          <Trendnow />
        </span>
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
        <span className="relative flex w-[12.5rem] items-center justify-end gap-x-2">
          {/* <span className="flex justify-center items-center w-fit h-10 px-3.5 py-2.5 rounded-full bg-gray-100 text-base font-medium select-none text-nowrap">
            로그인
          </span> */}
          <span className="flex h-10 w-fit select-none items-center justify-center gap-x-2.5 text-nowrap rounded-full bg-gray-100 py-2.5 pl-2.5 pr-3.5 text-base font-medium">
            <UserProfile28 />
            Trendnow
          </span>
          <span
            ref={dropMenuButtonRep}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-medium"
            onClick={handleDropMenuToggle}
          >
            <Hamburger24 />
          </span>
          {dropMenuOpen && (
            <span
              ref={dropMenuRep}
              className="absolute inset-full left-0 mt-3 flex h-fit w-[12.5rem] flex-col gap-y-1 rounded-[1.25rem] bg-white p-4 shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.14)]"
            >
              <span className="flex h-fit w-full select-none items-center gap-x-3 text-nowrap rounded-2xl bg-gray-100 py-3 pl-3 pr-4 text-base font-medium">
                <UserProfile32 />
                Trendnow
              </span>
              <span className="flex h-11 w-full items-center rounded-lg p-2 text-base font-medium text-gray-800">
                마이페이지
              </span>
              <span className="flex h-11 w-full items-center rounded-lg p-2 text-base font-medium text-gray-800">
                로그아웃
              </span>
            </span>
          )}
        </span>
      </div>
    </header>
  );
};

export default Appbar;
