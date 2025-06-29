import { DeleteAccountIcon } from '@/widgets/mypage/icons';
import React from 'react';

// 회원탈퇴 버튼
const DeleteAccountButton = () => {
  return (
    <div className="flex h-[2.8125rem] w-[6.375rem] items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-100">
      <DeleteAccountIcon />
      <div className="text-sm font-semibold text-gray-500">회원탈퇴</div>
    </div>
  );
};

export default DeleteAccountButton;
