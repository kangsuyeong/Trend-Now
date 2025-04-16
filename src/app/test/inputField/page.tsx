'use client';

import { Dropdown, DropdownItem } from '@/shared/ui/text-field/Dropdown';
import InputField from '@/shared/ui/text-field/InputField';
import InputFieldHelp from '@/shared/ui/text-field/InputFieldHelp';
import InputFieldPassword from '@/shared/ui/text-field/InputFieldPassword';
import InputFieldTitle from '@/shared/ui/text-field/InputFieldTitle';
import Textarea from '@/shared/ui/text-field/Textarea';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[800px] p-[16px]">
        {/* Input Field */}
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Email" type="basic" size="desktop" />
          <InputField placeholder="Email" type="basic" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Email" type="disabled" size="desktop" />
          <InputField placeholder="Email" type="disabled" size="mobile" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputField placeholder="Email" type="error" size="desktop" />
          <InputField placeholder="Email" type="error" size="mobile" />
        </div>
        {/* Input Field + Title */}
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD + TITLE</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle
            placeholder="Enter User"
            type="basic"
            size="desktop"
            label="User"
            className="w-full"
          />
          <InputFieldTitle
            placeholder="Enter User"
            type="basic"
            size="mobile"
            label="User"
            className="w-full"
          />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle
            placeholder="Enter User"
            type="disabled"
            size="desktop"
            label="User"
            className="w-full"
          />
          <InputFieldTitle
            placeholder="Enter User"
            type="disabled"
            size="mobile"
            label="User"
            className="w-full"
          />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldTitle
            placeholder="Enter User"
            type="error"
            size="desktop"
            label="User"
            className="w-full"
          />
          <InputFieldTitle
            placeholder="Enter User"
            type="error"
            size="mobile"
            label="User"
            className="w-full"
          />
        </div>
        {/* Input Field + Help */}
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD + HELP</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldHelp placeholder="Phone" type="basic" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="basic" size="mobile" helpText="Help Text" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldHelp placeholder="Phone" type="disabled" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="disabled" size="mobile" helpText="Help Text" />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldHelp placeholder="Phone" type="error" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="error" size="mobile" helpText="Help Text" />
        </div>
        {/* Input Field + Password */}
        <div className="text-1xl font-regular py-[8px]">INPUT FIELD + PASSWORD</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldPassword
            placeholder="Enter Password"
            type="basic"
            size="desktop"
            onForgotPassword={() => alert('hello world!')}
          />
          <InputFieldPassword
            placeholder="Enter Password"
            type="basic"
            size="mobile"
            onForgotPassword={() => alert('hello world!')}
          />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldPassword
            placeholder="Enter Password"
            type="disabled"
            size="desktop"
            onForgotPassword={() => alert('hello world!')}
          />
          <InputFieldPassword
            placeholder="Enter Password"
            type="disabled"
            size="mobile"
            onForgotPassword={() => alert('hello world!')}
          />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <InputFieldPassword
            placeholder="Enter Password"
            type="error"
            size="desktop"
            onForgotPassword={() => alert('hello world!')}
          />
          <InputFieldPassword
            placeholder="Enter Password"
            type="error"
            size="mobile"
            onForgotPassword={() => alert('hello world!')}
          />
        </div>
        {/* Textarea */}
        <div className="text-1xl font-regular py-[8px]">TEXTAREA</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Textarea placeholder="Description" type="basic" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="basic" size="mobile" maxLength={200} />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Textarea placeholder="Description" type="disabled" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="disabled" size="mobile" maxLength={200} />
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Textarea placeholder="Description" type="error" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="error" size="mobile" maxLength={200} />
        </div>
        {/* Dropdown */}
        <div className="text-1xl font-regular py-[8px]">DROPDOWN</div>
        <div className="flex flex-row py-[8px] gap-[16px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Dropdown type="basic" size="desktop" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
          <Dropdown type="basic" size="mobile" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Dropdown type="disabled" size="desktop" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
          <Dropdown type="disabled" size="mobile" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
        </div>
        <div className="flex flex-row items-center py-[8px] gap-[16px]">
          <Dropdown type="error" size="desktop" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
          <Dropdown type="error" size="mobile" defaultText="Select an option">
            <DropdownItem text="Option 1" value="option1" />
            <DropdownItem text="Option 2" value="option2" />
            <DropdownItem text="Option 3" value="option3" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default page;
