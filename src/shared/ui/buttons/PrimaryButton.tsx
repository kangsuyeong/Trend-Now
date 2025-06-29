import { cn } from '@/shared/lib/';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva('flex justify-center items-center', {
  variants: {
    variant: {
      primary: 'text-white bg-brand-500 hover:bg-hover-primary active:bg-active-primary',
      black: 'text-white bg-gray-800 hover:bg-hover-black active:bg-active-black',
      gray: 'text-gray-500 bg-gray-100 hover:bg-hover-gray active:bg-active-gray',
      error: 'text-white bg-negative hover:bg-hover-error active:bg-active-error',
    },
    size: {
      xl: 'h-14 px-8 text-lg font-semiBold rounded-xl',
      l: 'h-12 px-6 text-md font-semiBold rounded-xl',
      m: 'h-11 px-6 text-sm font-medium rounded-[10px]',
      s: 'h-9 px-4 text-xs font-medium rounded-[10px]',
      xs: 'h-7 px-3 text-2xs font-medium rounded-lg',
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
  size: 'xl' | 'l' | 'm' | 's' | 'xs';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2105&t=AbVReMRDhUgK1f4k-4
 */
const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
