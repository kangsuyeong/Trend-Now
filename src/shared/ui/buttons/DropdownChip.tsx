'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React, { createContext, useContext } from 'react';
import { ChevronVertical20 } from '..';
import { cn } from '@/shared/lib';

interface DropdownContextType {
  isOpen: boolean;
  selectedText: string;
  toggleOpen: () => void;
  setSelectedText: (text: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

interface DropdownProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof triggerVariants> {
  /**@param {'desktop' | 'mobile'} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} defaultText 기본 선택 텍스트 */
  defaultText: string;
  /**@param {String} defaultValue 기본 선택 값 */
  defaultValue?: string;
  /**@param {React.ReactNode} children 드랍다운 메뉴에 들어갈 아이템 요소 */
  children: React.ReactNode;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const DropdownChip = ({
  size,
  defaultText,
  children,
  ...props
}: DropdownProps & React.RefAttributes<HTMLSpanElement>) => {
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
    <DropdownContext.Provider value={{ isOpen, selectedText, toggleOpen, setSelectedText }}>
      <span ref={dropdownRef} className="relative flex h-fit w-fit flex-col gap-y-[8px]" {...props}>
        <DropdownChipTrigger size={size} />
        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-[8px] w-full">
            <DropdownChipMenu>{children}</DropdownChipMenu>
          </div>
        )}
      </span>
    </DropdownContext.Provider>
  );
};

DropdownChip.displayName = 'DropdownChip';

const triggerVariants = cva(
  'border rounded-full flex gap-x-1.5 font-light text-gray-800 focus:outline-none',
  {
    variants: {
      variant: {
        active: 'border-gray-400',
        inactive: 'bg-white border-gray-200',
      },
      size: {
        desktop: 'h-[2.375rem] pl-4 pr-3 text-sm',
        mobile: 'h-8 pl-3 pr-2 text-xs',
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
const DropdownChipTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, ...props }, ref) => {
    const [variant, setVariant] = React.useState<'active' | 'inactive'>('inactive');
    const { toggleOpen, selectedText } = useDropdown();
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
        <ChevronVertical20 />
      </button>
    );
  }
);

DropdownChipTrigger.displayName = 'DropdownChipTrigger';

interface DropdownMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**@param {String} children 드랍다운 메뉴에 들어갈 아이템 요소 */
  children: React.ReactNode;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const DropdownChipMenu = React.forwardRef<HTMLUListElement, DropdownMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useDropdown();

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

DropdownChipMenu.displayName = 'DropdownChipMenu';

interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
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
const DropdownChipItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ className, text, value, ...props }, ref) => {
    const { setSelectedText, selectedText } = useDropdown();

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

DropdownChipItem.displayName = 'DropdownChipItem';

export { DropdownChip, DropdownChipItem };
