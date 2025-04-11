import React from 'react';
import InputField from './InputField';

interface InputFieldTitleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'basic' | 'disabled' | 'error';
  size: 'desktop' | 'mobile';
  label: string;
}

const InputFieldTitle = React.forwardRef<HTMLInputElement, InputFieldTitleProps>(
  ({ className, variant, size, placeholder, label, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-y-[4px]">
        <label htmlFor="inputFieldTitle" className="text-xs">
          {label}
        </label>
        <InputField
          ref={ref}
          className={className}
          variant={variant}
          size={size}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

InputFieldTitle.displayName = 'InputFieldTitle';

export default InputFieldTitle;
