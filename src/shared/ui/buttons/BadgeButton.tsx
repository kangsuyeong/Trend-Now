import { cn } from '@/shared/lib/';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'flex justify-center items-center rounded-full text-xs font-semiBold px-2.5 py-1',
  {
    variants: {
      variant: {
        white: 'text-gray-400 border border-gray-200 bg-white',
        blue: 'text-white border border-brand-500 bg-brand-500',
        green: 'text-[#00C030] bg-[#00C030]/[10%] px-[0.688rem] py-[0.313rem]',
        yellow: 'text-white border border-point-500 bg-point-500',
      },
    },
  }
);

interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**@param {ReactNode} children 텍스트 혹은 HTML 요소 */
  children: React.ReactNode;
  /**@param {String} variant 버튼의 스타일을 고를 수 있습니다. */
  variant: 'white' | 'blue' | 'green' | 'yellow';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2275&t=cbvmKV4XEswTU85f-4
 */
const BadgeButton = React.forwardRef<HTMLButtonElement, BadgeButtonProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props}>
        {children}
      </button>
    );
  }
);

BadgeButton.displayName = 'BadgeButton';

export default BadgeButton;
