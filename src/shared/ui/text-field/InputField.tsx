import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/cn';

const inputFieldVariants = cva(
  'border rounded-xl w-full font-light text-gray-800 focus:outline-none focus:border-gray-400',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-600',
        disabled: 'bg-gray-700 border-gray-300',
        error: 'bg-white border-negative',
        active: '',
      },
      size: {
        desktop: 'h-[48px] pl-[16px] pr-[12px] text-md',
        mobile: 'h-[38px] pl-[12px] pr-[8px] text-xs',
      },
    },
  }
);

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
  /**@param {String} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type: variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputFieldVariants({ variant, size }), className)}
        {...props}
        disabled={variant === 'disabled'}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
