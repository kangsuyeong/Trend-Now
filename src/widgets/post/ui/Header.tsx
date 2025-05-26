import React from 'react';
import { BookmarkButton, PostKebabButton } from '@/features/post';
import { UserProfile28 } from '@/shared/ui';

export default function Header() {
  return (
    <div className="flex flex-col gap-y-8 border-b border-gray-200 pb-6">
      <div className="flex justify-between">
        <span className="flex flex-col gap-y-3">
          <span className="text-lg font-semiBold text-gray-500">자유게시판</span>
          <span className="text-2xl font-bold text-gray-800">
            헌재 전원일치로 윤석열 대통령 파면… 중대위법, 국민신임 배반
          </span>
        </span>
        <span className="flex gap-x-2">
          <BookmarkButton />
          <PostKebabButton />
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex items-center gap-x-2">
          <UserProfile28 />
          <span className="text-base font-medium text-gray-500">Trendnow</span>
        </span>
        <span className="flex items-center text-sm font-regular text-gray-500">
          <span className="flex items-center gap-x-1.5 rounded-md bg-gray-100 px-2.5 py-1">
            <span>댓글</span>
            <span>123</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>조회수</span>
            <span>125</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>추천</span>
            <span>125</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>작성일</span>
            <span>2025.04.03</span>
          </span>
        </span>
      </div>
    </div>
  );
}
