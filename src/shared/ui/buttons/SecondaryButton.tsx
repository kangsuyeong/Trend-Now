import { cn } from '@/shared/lib/cn';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva('flex justify-center items-center bg-white', {
  variants: {
    variant: {
      primary: 'text-brand-500 border border-brand-500',
      black: 'text-gray-800 border border-gray-800',
      gray: 'text-gray-600 border border-gray-300',
      error: 'text-negative border border-negative',
    },
    size: {
      xl: 'h-14 px-8 text-lg font-regular rounded-xl',
      l: 'h-12 px-7 text-base font-regular rounded-xl',
      m: 'h-10 px-5 text-md font-regular rounded-[10px]',
      s: 'h-9 px-4 text-xs font-regular rounded-[10px]',
    },
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**@param {ReactNode} children 텍스트 혹은 HTML 요소 */
  children: React.ReactNode;
  /**@param {String} variant 버튼의 상태에 따른 스타일을 고를 수 있습니다. */
  variant: 'primary' | 'black' | 'gray' | 'error';
  /**@param {String} size 버튼의 크기 */
  size: 'xl' | 'l' | 'm' | 's';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2105&t=AbVReMRDhUgK1f4k-4
 */
const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export default SecondaryButton;
