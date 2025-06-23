'use client';

import { axiosDeleteUser } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { DeleteAccountButton, ReferralCodeSection } from '@/widgets/mypage';
import { redirect } from 'next/navigation';
import React from 'react';

const MySettings = () => {
  const { jwt } = useUserStore();

  const handleDeleteAccount = async () => {
    const proceed = confirm(
      '정말로 회원 탈퇴를 하시겠습니까? 회원 탈퇴 후에는 복구할 수 없습니다.\n\n탈퇴를 원하시면 확인을 눌러주세요.'
    );

    if (proceed) {
      let result = false;

      if (jwt) {
        result = await axiosDeleteUser<void>(jwt).then(() => true);
      }

      if (result) {
        redirect('/home');
      } else {
        alert('회원 탈퇴 과정에 오류가 있었습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ReferralCodeSection />
      <div className="flex justify-end">
        <DeleteAccountButton onClick={handleDeleteAccount} />
      </div>
    </div>
  );
};

export default MySettings;
