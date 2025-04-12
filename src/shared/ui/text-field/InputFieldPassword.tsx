'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/cn';

const inputFieldVariants = cva(
  'border rounded-xl w-full focus:outline-none focus:border-gray-400',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-600',
        disabled: 'bg-gray-700 border-gray-300',
        error: 'bg-white border-negative',
        active: 'bg-white border-gray-400',
      },
    },
  }
);

const passwordVariants = cva('font-light', {
  variants: {
    size: {
      desktop: 'h-[48px] pl-[16px] pr-[12px] text-md',
      mobile: 'h-[38px] pl-[12px] pr-[8px] text-xs',
    },
  },
});

const forgotPasswordVariants = cva(
  'w-fit py-[10px] px-[12px] text-sm font-light text-brand-500 whitespace-nowrap cursor-pointer',
  {
    variants: {
      variant: {
        basic: 'text-brand-500',
        disabled: 'text-gray-500',
        error: 'text-negative',
        active: 'text-brand-500',
      },
    },
  }
);

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldVariants>,
    VariantProps<typeof passwordVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
  /**@param {String} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} [onForgotPassword] Forgot Password? 버튼을 클릭했을 시의 이벤트 */
  onForgotPassword?: () => void;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const InputFieldPassword = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, size, onForgotPassword, ...props }, ref) => {
    const [variant, setVariant] = React.useState<'basic' | 'disabled' | 'error' | 'active'>(type);
    return (
      <span className={cn(inputFieldVariants({ variant }), className, 'flex flex-row gap-x-[8px]')}>
        <input
          ref={ref}
          type="password"
          className={cn(
            passwordVariants({ size }),
            'w-full border-none font-light text-gray-800 rounded-xl focus:outline-none'
          )}
          {...props}
          disabled={variant === 'disabled'}
          onFocus={() => setVariant('active')}
          onBlur={() => setVariant(type)}
        />
        <span
          className={cn(forgotPasswordVariants({ variant }))}
          onClick={variant === 'disabled' ? undefined : onForgotPassword}
        >
          Forgot Password?
        </span>
      </span>
    );
  }
);

InputFieldPassword.displayName = 'InputFieldPassword';

export default InputFieldPassword;
