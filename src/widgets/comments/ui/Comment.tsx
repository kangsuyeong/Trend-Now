import { UserProfile24 } from '@/shared/ui';
import React from 'react';
import Reply from './Reply';
import { CommentKebabButton } from '@/features/post';

interface CommentProps {
  /**@param {boolean} showMenu 댓글 수정 삭제 메뉴 표시 여부  */
  showMenu?: boolean;
}

export default function Comment({ showMenu = false }: CommentProps) {
  return (
    <div className="flex flex-col gap-y-4 py-5">
      <div className="flex items-center justify-between">
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
        <span>{showMenu && <CommentKebabButton />}</span>
      </div>
      <div className="flex flex-col divide-y divide-gray-200 rounded-2xl bg-[#EEF3F5] px-5">
        <Reply />
        <Reply />
      </div>
    </div>
  );
}
