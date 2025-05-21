'use client';

import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/';
import InformationOutlined16 from '../icons/16/InformationOutlined16';

const inputFieldVariants = cva(
  'border rounded-xl w-full font-light text-gray-800 focus:outline-none focus:border-gray-400',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-200',
        disabled: 'bg-gray-100 border-gray-300',
        error: 'bg-white border-negative',
        active: 'bg-white border-gray-400',
      },
      size: {
        desktop: 'h-[48px] pl-[16px] pr-[12px] text-md',
        mobile: 'h-[38px] pl-[12px] pr-[8px] text-xs',
      },
    },
  }
);

const helpTextVariants = cva('font-light', {
  variants: {
    variant: {
      basic: 'text-gray-500',
      disabled: 'text-gray-500',
      error: 'text-negative',
      active: 'text-gray-800',
    },
    size: {
      desktop: 'text-xs',
      mobile: 'text-2xs',
    },
  },
});

interface InputFieldTitleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof helpTextVariants>,
    VariantProps<typeof inputFieldVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
  /**@param {String} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} helpText 입력 상자 하단 텍스트 */
  helpText: string;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const InputFieldHelp = React.forwardRef<HTMLInputElement, InputFieldTitleProps>(
  ({ className, type, size, helpText, ...props }, ref) => {
    const [variant, setVariant] = React.useState<'basic' | 'disabled' | 'error' | 'active'>(type);
    return (
      <div className={cn(className, 'flex w-full flex-col gap-y-[8px]')}>
        <input
          ref={ref}
          className={cn(inputFieldVariants({ variant, size }), className)}
          {...props}
          disabled={variant === 'disabled'}
          onFocus={() => setVariant('active')}
          onBlur={() => setVariant(type)}
        />
        <span
          className={cn(
            helpTextVariants({ variant, size }),
            'flex flex-row items-center gap-x-[4px]'
          )}
        >
          <InformationOutlined16
            color={
              variant === 'basic' || variant === 'disabled'
                ? '#9C9FA2'
                : variant === 'error'
                  ? '#FF4227'
                  : '#222323'
            }
          />
          {helpText}
        </span>
      </div>
    );
  }
);

InputFieldHelp.displayName = 'InputFieldHelp';

export default InputFieldHelp;
