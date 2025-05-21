import React from 'react';

type Props = {
  /**@param color Gray500 | Negative | Gray800 */
  color?: '#9C9FA2' | '#FF4227' | '#222323';
};

const InformationOutlined16 = ({ color }: Props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_6_1607)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.99967 1.8335C4.59392 1.8335 1.83301 4.59441 1.83301 8.00016C1.83301 11.4059 4.59392 14.1668 7.99967 14.1668C11.4054 14.1668 14.1663 11.4059 14.1663 8.00016C14.1663 4.59441 11.4054 1.8335 7.99967 1.8335ZM0.833008 8.00016C0.833008 4.04212 4.04163 0.833496 7.99967 0.833496C11.9577 0.833496 15.1663 4.04212 15.1663 8.00016C15.1663 11.9582 11.9577 15.1668 7.99967 15.1668C4.04163 15.1668 0.833008 11.9582 0.833008 8.00016Z"
          fill={color ?? '#9C9FA2'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.99967 6.73828C8.36786 6.73828 8.66634 7.02319 8.66634 7.37464V11.3634C8.66634 11.7149 8.36786 11.9998 7.99967 11.9998C7.63148 11.9998 7.33301 11.7149 7.33301 11.3634V7.37464C7.33301 7.02319 7.63148 6.73828 7.99967 6.73828Z"
          fill={color ?? '#9C9FA2'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.33301 4.66667C7.33301 4.29848 7.62951 4 7.99526 4H8.00409C8.36984 4 8.66634 4.29848 8.66634 4.66667C8.66634 5.03486 8.36984 5.33333 8.00409 5.33333H7.99526C7.62951 5.33333 7.33301 5.03486 7.33301 4.66667Z"
          fill={color ?? '#9C9FA2'}
        />
      </g>
      <defs>
        <clipPath id="clip0_6_1607">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InformationOutlined16;
