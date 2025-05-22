'use client';

import React from 'react';
import { House24 } from '@/shared/ui/';
import { usePathname, useRouter } from 'next/navigation';

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    { name: '자유게시판', path: '/free' },
    { name: '정치게시판', path: '/politics' },
    { name: '연예게시판', path: '/entertain' },
  ];

  return (
    <div className="flex justify-center bg-white pb-10 pt-4">
      <ul className="flex h-[4.5rem] items-center gap-x-2 rounded-full bg-gray-100 px-5 py-3">
        <li>
          <label className="group flex cursor-pointer items-center">
            <input
              checked={pathname.startsWith('/home') || pathname.startsWith('/hotBoard')}
              type="radio"
              name="menu-bar"
              className="hidden appearance-none"
              onChange={() => router.push('/')}
            />
            <span className="flex items-center justify-center text-nowrap rounded-full px-5 py-2 text-base font-semiBold text-gray-500 group-has-[:checked]:bg-gray-200 group-has-[:checked]:text-gray-900">
              <House24 className="fill-gray-500 group-has-[:checked]:fill-gray-800" />
            </span>
          </label>
        </li>
        {menus.map((item) => (
          <li key={item.name}>
            <label className="group flex cursor-pointer items-center">
              <input
                checked={pathname.startsWith(item.path)}
                type="radio"
                name="menu-bar"
                className="hidden appearance-none"
                onChange={() => router.push(item.path)}
              />
              <span className="flex items-center justify-center text-nowrap rounded-full px-5 py-2 text-base font-semiBold text-gray-500 group-has-[:checked]:bg-gray-200 group-has-[:checked]:text-gray-900">
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
