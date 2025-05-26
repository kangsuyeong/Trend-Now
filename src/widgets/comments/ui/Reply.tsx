import { CommentKebabButton } from '@/features/post';
import { UserProfile24 } from '@/shared/ui';
import React from 'react';

export default function Reply() {
  return (
    <div className="flex w-full items-center justify-between py-5">
      <span className="flex flex-col gap-y-0.5">
        <span className="flex items-center gap-x-4">
          <span className="flex items-center gap-x-2">
            <UserProfile24 />
            <span className="text-xs font-medium text-gray-500">Trendnow_001</span>
          </span>
          <span className="text-sm font-regular text-gray-400">2025.04.03 21:52</span>
        </span>
        <span className="pl-8 text-md font-medium text-gray-800">
          간첩지지냐 설마! 디씨하는 한국인이 ㅋㄱㄱ
        </span>
      </span>
      <CommentKebabButton />
    </div>
  );
}
