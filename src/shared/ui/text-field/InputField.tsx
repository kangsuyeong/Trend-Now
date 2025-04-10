import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../util/cn';

const inputFieldVariants = cva(
  'border rounded-xl w-full font-light text-gray-0 focus:outline-none focus:border-gray-400',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-600',
        disabled: 'bg-gray-700 border-gray-500',
        error: 'bg-white border-negative',
      },
      size: {
        desktop: 'py-[10px] pl-[16px] pr-[12px] text-md',
        mobile: 'py-[10px] pl-[12px] pr-[8px] text-xs',
      },
    },
  }
);

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldVariants> {
  variant: 'basic' | 'disabled' | 'error';
  size: 'desktop' | 'mobile';
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, variant, size, placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputFieldVariants({ variant, size }), className)}
        {...props}
        placeholder={placeholder}
        disabled={variant === 'disabled'}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
