import { cva, VariantProps } from 'class-variance-authority';
import React, { ChangeEvent } from 'react';
import { cn } from '../../lib/cn';

const textareaVariants = cva(
  'border rounded-xl w-full font-light text-gray-800 focus:outline-none focus:border-gray-400',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-200',
        disabled: 'bg-gray-100 border-gray-300',
        error: 'bg-white border-negative',
        active: '',
      },
      size: {
        desktop: 'p-[12px] pr-[12px] text-md',
        mobile: 'py-[12px] pl-[12px] pr-[8px] text-xs',
      },
    },
  }
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  type: 'basic' | 'disabled' | 'error' | 'active';
  /**@param {String} size PC 혹은 모바일 */
  size: 'desktop' | 'mobile';
  /**@param {String} maxLength 입력 가능한 텍스트 최대 길이 */
  maxLength: number;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, type: variant, size, maxLength, ...props }, ref) => {
    const [textLength, setTextLength] = React.useState(0);
    const handleTextChange = React.useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextLength(e.target.value.length);
    }, []);
    return (
      <span className="w-full flex flex-col gap-y-[4px]">
        <textarea
          ref={ref}
          className={cn(textareaVariants({ variant, size }), className, 'resize-none')}
          disabled={variant === 'disabled'}
          onChange={handleTextChange}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex justify-end text-2xs font-light">
          {textLength} / {maxLength}
        </div>
      </span>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
