import { DeleteAccountButton, ReferralCodeSection } from '@/widgets/mypage';
import React from 'react';

const MySettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <ReferralCodeSection />
      <div className="flex justify-end">
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default MySettings;
