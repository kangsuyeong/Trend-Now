'use client';

import React, { useEffect, useRef, useState } from 'react';
import Trendnow from '../icons/Trendnow';
import Search24 from '../icons/24/Search24';
import Hamburger24 from '../icons/24/Hamburger24';
import UserProfile28 from '../icons/28/UserProfile28';
import UserProfile32 from '../icons/32/UserProfile32';

const Appbar = () => {
  const [dropMenuOpen, setDropMenuOpen] = useState(false);

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
    <header className="flex justify-center items-center h-20 w-full border-b border-gray-200">
      <div className="w-[1248px] mx-8 flex justify-between">
        <span className="flex items-center">
          <Trendnow />
        </span>
        <span className="flex justify-between items-center w-[28.75rem] h-full border border-gray-200 rounded-full bg-gray-100">
          <input
            type="search"
            placeholder="원하는 검색어를 입력해주세요."
            className="w-full px-5 py-2.5 text-base font-medium text-gray-400 bg-transparent focus:outline-none"
          />
          <span className="px-5 py-2.5">
            <Search24 />
          </span>
        </span>
        <span className="relative flex justify-end items-center gap-x-2 w-[12.5rem]">
          {/* <span className="flex justify-center items-center w-fit h-10 px-3.5 py-2.5 rounded-full bg-gray-100 text-base font-medium select-none text-nowrap">
            로그인
          </span> */}
          <span className="flex justify-center gap-x-2.5 items-center w-fit h-10 pr-3.5 pl-2.5 py-2.5 rounded-full bg-gray-100 text-base font-medium select-none text-nowrap">
            <UserProfile28 />
            Trendnow
          </span>
          <span
            ref={dropMenuButtonRep}
            className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 text-base font-medium"
            onClick={handleDropMenuToggle}
          >
            <Hamburger24 />
          </span>
          {dropMenuOpen && (
            <span
              ref={dropMenuRep}
              className="absolute left-0 inset-full h-fit flex flex-col gap-y-1 w-[12.5rem] p-4 mt-3 bg-white rounded-[1.25rem] shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.14)]"
            >
              <span className="flex gap-x-3 items-center w-full h-fit pr-4 pl-3 py-3 rounded-2xl bg-gray-100 text-base font-medium select-none text-nowrap">
                <UserProfile32 />
                Trendnow
              </span>
              <span className="flex items-center w-full h-11 rounded-lg p-2 text-base font-medium text-gray-800">
                마이페이지
              </span>
              <span className="flex items-center w-full h-11 rounded-lg p-2 text-base font-medium text-gray-800">
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
