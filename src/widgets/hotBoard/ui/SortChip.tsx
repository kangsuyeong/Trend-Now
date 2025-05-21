'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React, { createContext, useContext } from 'react';
import { cn } from '@/shared/lib';
import { SortChevron } from './icons';

interface SortChipContextType {
  isOpen: boolean;
  selectedText: string;
  toggleOpen: () => void;
  setSelectedText: (text: string) => void;
}

export const SortChipContext = createContext<SortChipContextType | null>(null);

export const useSortChip = () => {
  const context = useContext(SortChipContext);
  if (!context) {
    throw new Error('SortChip 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

interface SortChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof triggerVariants> {
  /**@param {'desktop' | 'mobile'} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} defaultText 기본 선택 텍스트 */
  defaultText: string;
  /**@param {React.ReactNode} children 드랍다운 메뉴에 들어갈 아이템 요소 */
  children: React.ReactNode;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const SortChip = ({
  size,
  defaultText,
  children,
  ...props
}: SortChipProps & React.RefAttributes<HTMLSpanElement>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState<string>(defaultText);
  const dropdownRef = React.useRef<HTMLSpanElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SortChipContext.Provider value={{ isOpen, selectedText, toggleOpen, setSelectedText }}>
      <span ref={dropdownRef} className="relative flex h-fit w-fit flex-col gap-y-[8px]" {...props}>
        <SortChipTrigger size={size} />
        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-[8px] w-full">
            <SortChipMenu>{children}</SortChipMenu>
          </div>
        )}
      </span>
    </SortChipContext.Provider>
  );
};

SortChip.displayName = 'SortChip';

const triggerVariants = cva(
  'rounded-full flex gap-x-1.5 font-medium text-gray-500 focus:outline-none py-2 h-fit',
  {
    variants: {
      variant: {
        active: 'bg-gray-100',
        inactive: 'bg-gray-100',
      },
      size: {
        desktop: 'pl-4 pr-3 text-base',
        mobile: 'pl-3 pr-2 text-base',
      },
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof triggerVariants> {
  /**@param {'desktop' | 'mobile'} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const SortChipTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, ...props }, ref) => {
    const [variant, setVariant] = React.useState<'active' | 'inactive'>('inactive');
    const { toggleOpen, selectedText } = useSortChip();
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          triggerVariants({ variant, size }),
          className,
          'relative flex flex-row items-center justify-between'
        )}
        onFocus={() => setVariant('active')}
        onBlur={() => setVariant('inactive')}
        onClick={toggleOpen}
        {...props}
      >
        <span>{selectedText}</span>
        <SortChevron />
      </button>
    );
  }
);

SortChipTrigger.displayName = 'SortChipTrigger';

interface SortChipMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**@param {String} children 드랍다운 메뉴에 들어갈 아이템 요소 */
  children: React.ReactNode;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const SortChipMenu = React.forwardRef<HTMLUListElement, SortChipMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useSortChip();

    if (!isOpen) return null;

    return (
      <ul
        ref={ref}
        className={cn(
          className,
          'w-full rounded-2xl border border-gray-200 bg-white px-[8px] py-[12px]'
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

SortChipMenu.displayName = 'SortChipMenu';

interface SortChipItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**@param {String} text 표시될 텍스트 */
  text: string;
  /**@param {String} text 아이템 값 */
  value: string;
  /**@param {boolean} [selected=false] 선택 유무 */
  selected?: string;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const SortChipItem = React.forwardRef<HTMLLIElement, SortChipItemProps>(
  ({ className, text, value, ...props }, ref) => {
    const { setSelectedText, selectedText } = useSortChip();

    return (
      <li
        ref={ref}
        value={value}
        className={cn(
          'flex select-none flex-row rounded-xl px-[12px] py-[8px] text-sm font-light text-gray-800',
          className,
          text === selectedText ? 'bg-gray-100' : ''
        )}
        onClick={() => setSelectedText(text)}
        {...props}
      >
        {text}
      </li>
    );
  }
);

SortChipItem.displayName = 'SortChipItem';

export { SortChip, SortChipItem };
