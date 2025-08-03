'use client';

import { UserProfile } from '@/shared/types';
import { axiosUserProfile } from '@/shared/api';
import { SecondaryButton, Settings20, UserProfile64 } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyPageHeader = () => {
  const { data } = useQuery({
    queryKey: ['mypage'],
    queryFn: () => axiosUserProfile<UserProfile>(),
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-5">
        <UserProfile64 />
        <div className="flex flex-col justify-between">
          <div className="text-2xl font-semibold">{data?.nickname}</div>
          <div className="text-base text-gray-500">{data?.email}</div>
        </div>
      </div>
      <SecondaryButton variant="gray" size="s">
        <div className="flex gap-1">
          <Settings20 />
          <div>프로필 편집</div>
        </div>
      </SecondaryButton>
    </div>
  );
};

export default MyPageHeader;
