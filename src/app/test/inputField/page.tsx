import InputField from '@/shared/ui/text-field/InputField';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[800px] p-[16px]">
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Hello world!" variant="basic" size="desktop" />
          <InputField placeholder="Hello world!" variant="basic" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Hello world!" variant="disabled" size="desktop" />
          <InputField placeholder="Hello world!" variant="disabled" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Hello world!" variant="error" size="desktop" />
          <InputField placeholder="Hello world!" variant="error" size="mobile" />
        </div>
      </div>
    </div>
  );
};

export default page;
