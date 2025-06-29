import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const dividerVariants = cva(
  'flex w-fit rounded-lg px-3 py-1.5 text-base font-medium text-white text-nowrap',
  {
    variants: {
      background: {
        black: 'bg-gray-800',
        gray: 'bg-gray-400',
      },
    },
  }
);

interface DateDividerProps extends VariantProps<typeof dividerVariants> {
  /**@param {Date} date 컴포넌트 좌측 날짜 표시 */
  date: Date;
  /**@param {string} background 컴포넌트 좌측 날짜 배경 색깔 */
  background: 'black' | 'gray';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=110-11972&t=PLJmMU7D44vufQe1-4
 */
export default function DateDivider({ date, background }: DateDividerProps) {
  return (
    <div className="flex w-full items-center gap-x-2">
      <span className={cn(dividerVariants({ background }))}>
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
      </span>
      <hr className="w-full rounded-full border-[1.5px] border-gray-300" />
      <span className="aspect-square h-4 w-4 rounded-[0.25rem] bg-gray-300" />
    </div>
  );
}
