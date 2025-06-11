import { SecondaryButton, Settings20, UserProfile64 } from '@/shared/ui';
import React from 'react';

const MyPageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-5">
        <UserProfile64 />
        <div className="flex flex-col justify-between">
          <div className="text-2xl font-semibold">Trend Now</div>
          <div className="text-base text-gray-500">@user_12563as</div>
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
