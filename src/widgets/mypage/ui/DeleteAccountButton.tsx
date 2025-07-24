import { DeleteAccountIcon } from '@/widgets/mypage/icons';
import React from 'react';

interface DeleteAccountButtonProps {
  /**@param {() => void} onClick 클릭 시 실행할 함수 */
  onClick: () => void;
}

// 회원탈퇴 버튼
const DeleteAccountButton = ({ onClick }: DeleteAccountButtonProps) => {
  return (
    <div
      className="flex h-[2.8125rem] w-[6.375rem] cursor-pointer items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-100"
      onClick={onClick}
    >
      <DeleteAccountIcon />
      <div className="text-sm font-semibold text-gray-500">회원탈퇴</div>
    </div>
  );
};

export default DeleteAccountButton;
