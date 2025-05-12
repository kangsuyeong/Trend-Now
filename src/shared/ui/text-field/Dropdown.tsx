'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React, { createContext, useContext } from 'react';
import ChevronVertical28 from '../icons/28/ChevronVertical28';
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
  /**@param {'basic' | 'disabled' | 'error' | 'active'} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
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
const Dropdown = ({
  className,
  type,
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
      <span
        ref={dropdownRef}
        className={cn('relative flex w-full flex-col gap-y-[8px]', className)}
        {...props}
      >
        <DropdownTrigger type={type} size="desktop" className="relative" />
        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-[8px] w-full">
            <DropdownMenu>{children}</DropdownMenu>
          </div>
        )}
      </span>
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = 'Dropdown';

const triggerVariants = cva(
  'border rounded-xl w-full font-light text-gray-800 focus:outline-none',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-200 text-gray-500',
        disabled: 'bg-gray-100 border-gray-300 text-gray-500',
        error: 'bg-white border-negative text-gray-800',
        active: 'border-gray-400 text-gray-800',
      },
      size: {
        desktop: 'h-[48px] pl-[16px] pr-[12px] text-md',
        mobile: 'h-[38px] pl-[12px] pr-[8px] text-xs',
      },
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof triggerVariants> {
  /**@param {'basic' | 'disabled' | 'error' | 'active'} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
  /**@param {'desktop' | 'mobile'} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const DropdownTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, size, ...props }, ref) => {
    const [variant, setVariant] = React.useState<'basic' | 'disabled' | 'error' | 'active'>(type);
    const { toggleOpen, selectedText } = useDropdown();
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          triggerVariants({ variant, size }),
          className,
          'flex flex-row items-center justify-between'
        )}
        disabled={variant === 'disabled'}
        onFocus={() => setVariant('active')}
        onBlur={() => setVariant(type)}
        onClick={toggleOpen}
        {...props}
      >
        <span>{selectedText}</span>
        <ChevronVertical28 color={variant === 'active' ? '#222323' : '#9C9FA2'} />
      </button>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

interface DropdownMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**@param {String} children 드랍다운 메뉴에 들어갈 아이템 요소 */
  children: React.ReactNode;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const DropdownMenu = React.forwardRef<HTMLUListElement, DropdownMenuProps>(
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

DropdownMenu.displayName = 'DropdownMenu';

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
const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
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

DropdownItem.displayName = 'DropdownItem';

export { Dropdown, DropdownItem };
