import React from 'react';

interface CloseButtonProps {
  /**@param {boolean} open 열려있는지 여부 */
  open?: boolean;
  /**@param {() => void} onClick 닫기 버튼 클릭 시 실행되는 함수 */
  onClick?: () => void;
}

export default function CloseButton({ open = true, onClick }: CloseButtonProps) {
  return (
    <>
      <input
        id="close"
        type="checkbox"
        className="peer hidden"
        defaultChecked={open}
        onClick={onClick}
      />
      <label
        htmlFor="close"
        className="flex h-5 w-5 rotate-0 cursor-pointer items-center justify-center transition-transform peer-checked:-rotate-45"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00065 1.33301L8.00065 14.6663M14.6673 7.99967L1.33398 7.99967"
            stroke="black"
            strokeOpacity="0.28"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      </label>
    </>
  );
}
