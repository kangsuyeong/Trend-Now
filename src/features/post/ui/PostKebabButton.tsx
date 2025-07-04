'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Delete, Write } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PostKebabButton() {
  const pathname = usePathname();
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

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
    <span className="relative select-none">
      <span
        ref={dropMenuButtonRep}
        onClick={handleDropMenuToggle}
        className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-8 before:w-8 before:content-[url('/images/icons/icon_kebab_32x32.svg')]"
      />
      {dropMenuOpen && (
        <span
          ref={dropMenuRep}
          className="absolute right-0 z-10 mt-2 flex h-fit w-[12.5rem] flex-col gap-y-1 rounded-[1.25rem] bg-white p-4 shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.08)]"
        >
          <Link
            href={`${pathname}/edit`}
            className="flex h-11 w-full cursor-pointer items-center gap-x-1.5 rounded-xl p-2 text-md font-medium text-gray-800 hover:bg-gray-100"
          >
            <Write />
            <span>게시글 수정</span>
          </Link>
          <span className="flex h-11 w-full cursor-pointer items-center gap-x-1.5 rounded-xl p-2 text-md font-medium text-negative hover:bg-gray-100">
            <Delete /> <span>게시글 삭제</span>
          </span>
        </span>
      )}
    </span>
  );
}
