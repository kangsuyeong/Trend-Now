import React from 'react';

type Props = {
  /**@param color Gray500 | Negative | Gray800 */
  color?: '#9C9FA2' | '#222323';
};

const ChevronVertical28 = ({ color }: Props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.73616 12.4394C7.95375 12.2018 8.32274 12.1856 8.56033 12.4032L14.0006 17.3856L19.439 12.4032C19.6765 12.1856 20.0455 12.2017 20.2631 12.4393C20.4808 12.6768 20.4646 13.0458 20.2271 13.2635L14.3947 18.6068C14.1717 18.8111 13.8296 18.8111 13.6066 18.6069L7.77236 13.2635C7.53478 13.0459 7.51857 12.6769 7.73616 12.4394Z"
        fill={color ?? '#9C9FA2'}
      />
    </svg>
  );
};

export default ChevronVertical28;
