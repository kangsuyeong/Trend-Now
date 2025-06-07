import { InputField, PrimaryButton } from '@/shared/ui';
import { CopyIcon, DeleteAccountIcon } from '@/widgets/mypage/icons';
import React from 'react';

const MySettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-16 items-center justify-between rounded-2xl border border-gray-200 px-5">
        <div className="flex flex-col justify-between">
          <div className="text-md font-semibold text-gray-800">추천인 코드 입력</div>
          <div className="flex items-center">
            <div className="text-xs text-gray-500">내 추천인 코드 : FAS253SHD</div>
            <CopyIcon />
          </div>
        </div>
        <div className="flex gap-2">
          <InputField
            placeholder="추천인 코드를 입력해주세요."
            type="basic"
            size="mobile"
            className="w-52"
          />
          <PrimaryButton variant="black" size="s">
            확인
          </PrimaryButton>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex h-[2.8125rem] w-[6.375rem] items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-100">
          <DeleteAccountIcon />
          <div className="text-sm font-semibold text-gray-500">회원탈퇴</div>
        </div>
      </div>
    </div>
  );
};

export default MySettings;
