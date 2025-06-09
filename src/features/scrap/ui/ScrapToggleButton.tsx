'use client';

import { ScrapFilledIcon, ScrapOutlinedIcon } from '@/features/scrap/icons';
import { useState } from 'react';
import { cn } from '@/shared/lib/';
interface ScrapToggleButtonProps {
  /**@param {number} buttonSize 사이즈 */
  size: 's' | 'm';
}

const sizeMap = {
  s: { button: 'w-6 h-6 rounded-md', icon: 24 },
  m: { button: 'w-10 h-10 rounded-lg', icon: 28 },
};

const ScrapToggleButton = ({ size }: ScrapToggleButtonProps) => {
  const [isScrapped, setIsScrapped] = useState(false);
  const { button, icon } = sizeMap[size];

  const handleToggle = () => {
    setIsScrapped((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'flex items-center justify-center border',
        button,
        isScrapped ? 'border-brand-500' : 'border-gray-200'
      )}
    >
      {isScrapped ? <ScrapFilledIcon size={icon} /> : <ScrapOutlinedIcon size={icon} />}
    </button>
  );
};

export default ScrapToggleButton;
