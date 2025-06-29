import React from 'react';
import InputField from './InputField';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/';

const inputFieldVariants = cva('font-light', {
  variants: {
    variant: {
      basic: 'text-gray-800',
      disabled: 'text-gray-500',
      error: 'text-gray-800',
    },
    size: {
      desktop: 'text-xs',
      mobile: 'text-2xs',
    },
  },
});

interface InputFieldTitleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error';
  /**@param {String} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} label 입력 상자 상단 텍스트 */
  label: string;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const InputFieldTitle = React.forwardRef<HTMLInputElement, InputFieldTitleProps>(
  ({ className, type: variant, size, label, ...props }, ref) => {
    return (
      <div className={cn(className, 'flex flex-col gap-y-[4px]')}>
        <span className={cn(inputFieldVariants({ variant, size }))}>{label}</span>
        <InputField ref={ref} type={variant} size={size} {...props} />
      </div>
    );
  }
);

InputFieldTitle.displayName = 'InputFieldTitle';

export default InputFieldTitle;
