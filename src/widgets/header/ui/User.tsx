'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Hamburger24, UserProfile32 } from '@/shared/ui/';
import { LoginModal } from '@/features/login';

export default function User() {
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dropMenuButtonRep = useRef<HTMLSpanElement>(null);
  const dropMenuRep = useRef<HTMLSpanElement>(null);
  const loginModalRep = useRef<HTMLDivElement>(null);

  const handleDropMenuToggle = () => {
    setDropMenuOpen((prev) => {
      return !prev;
    });
  };

  const handleModalOpen = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.scrollbarGutter = 'stable';
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    document.body.style.overflow = 'auto';
    document.body.style.scrollbarGutter = 'auto';
    setIsModalOpen(false);
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
    <>
      <span className="relative flex w-[12.5rem] items-center justify-end gap-x-2">
        {/* <span className="flex h-10 w-fit select-none items-center justify-center gap-x-2.5 text-nowrap rounded-full bg-gray-100 py-2.5 pl-2.5 pr-3.5 text-base font-medium">
          {session.user && session.user.image ? (
            <Image
              src={session.user.image}
              alt="프로필 사진"
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <UserProfile28 />
          )}
          trendnow
        </span> */}
        <span
          className="flex h-10 w-fit cursor-pointer select-none items-center justify-center text-nowrap rounded-full bg-gray-100 px-3.5 py-2.5 text-base font-medium"
          onClick={handleModalOpen}
        >
          로그인
        </span>
        <span
          ref={dropMenuButtonRep}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-base font-medium"
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
              trendnow
            </span>
            <span className="flex h-11 w-full cursor-pointer items-center rounded-lg p-2 text-base font-medium text-gray-800">
              마이페이지
            </span>
            <span className="flex h-11 w-full cursor-pointer items-center rounded-lg p-2 text-base font-medium text-gray-800">
              로그아웃
            </span>
          </span>
        )}
      </span>
      <LoginModal ref={loginModalRep} onClose={handleModalClose} open={isModalOpen} />
    </>
  );
}
