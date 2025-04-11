import InputField from '@/shared/ui/text-field/InputField';
import InputFieldTitle from '@/shared/ui/text-field/InputFieldTitle';
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
          <InputField placeholder="Email" variant="basic" size="desktop" />
          <InputField placeholder="Email" variant="basic" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Email" variant="disabled" size="desktop" />
          <InputField placeholder="Email" variant="disabled" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Email" variant="error" size="desktop" />
          <InputField placeholder="Email" variant="error" size="mobile" />
        </div>
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD + TITLE</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle placeholder="Enter User" variant="basic" size="desktop" label="User" />
          <InputFieldTitle placeholder="Enter User" variant="basic" size="mobile" label="User" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle
            placeholder="Enter User"
            variant="disabled"
            size="desktop"
            label="User"
          />
          <InputFieldTitle placeholder="Enter User" variant="disabled" size="mobile" label="User" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle placeholder="Enter User" variant="error" size="desktop" label="User" />
          <InputFieldTitle placeholder="Enter User" variant="error" size="mobile" label="User" />
        </div>
      </div>
    </div>
  );
};

export default page;
