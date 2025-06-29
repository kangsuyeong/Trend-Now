'use client';

import {
  Dropdown,
  DropdownItem,
  InputField,
  InputFieldHelp,
  InputFieldPassword,
  InputFieldTitle,
  Textarea,
} from '@/shared/ui/';
import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[800px] flex-col p-[16px]">
        {/* Input Field */}
        <div className="py-[8px] text-1xl font-medium">INPUT FIELD</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputField placeholder="Email" type="basic" size="desktop" />
          <InputField placeholder="Email" type="basic" size="mobile" />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputField placeholder="Email" type="disabled" size="desktop" />
          <InputField placeholder="Email" type="disabled" size="mobile" />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputField placeholder="Email" type="error" size="desktop" />
          <InputField placeholder="Email" type="error" size="mobile" />
        </div>
        {/* Input Field + Title */}
        <div className="py-[8px] text-1xl font-medium">INPUT FIELD + TITLE</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="py-[8px] text-1xl font-medium">INPUT FIELD + HELP</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputFieldHelp placeholder="Phone" type="basic" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="basic" size="mobile" helpText="Help Text" />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputFieldHelp placeholder="Phone" type="disabled" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="disabled" size="mobile" helpText="Help Text" />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <InputFieldHelp placeholder="Phone" type="error" size="desktop" helpText="Help Text" />
          <InputFieldHelp placeholder="Phone" type="error" size="mobile" helpText="Help Text" />
        </div>
        {/* Input Field + Password */}
        <div className="py-[8px] text-1xl font-medium">INPUT FIELD + PASSWORD</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="py-[8px] text-1xl font-medium">TEXTAREA</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <Textarea placeholder="Description" type="basic" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="basic" size="mobile" maxLength={200} />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <Textarea placeholder="Description" type="disabled" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="disabled" size="mobile" maxLength={200} />
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
          <Textarea placeholder="Description" type="error" size="desktop" maxLength={200} />
          <Textarea placeholder="Description" type="error" size="mobile" maxLength={200} />
        </div>
        {/* Dropdown */}
        <div className="py-[8px] text-1xl font-medium">DROPDOWN</div>
        <div className="flex flex-row gap-[16px] py-[8px]">
          <span className="w-full">DESKTOP</span>
          <span className="w-full">MOBILE</span>
        </div>
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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
        <div className="flex flex-row items-center gap-[16px] py-[8px]">
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

export default Page;
