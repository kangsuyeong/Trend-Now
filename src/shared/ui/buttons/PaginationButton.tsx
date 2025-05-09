'use client';

import { cn } from '@/shared/lib/cn';
import { cva, VariantProps } from 'class-variance-authority';
import React, { createContext, useContext } from 'react';
import PageLeftDoubleChevron from '../icons/pagination/PageLeftDoubleChevron';
import PageLeftChevron from '../icons/pagination/PageLeftChevron';
import PageRightChevron from '../icons/pagination/PageRightChevron';
import PageRightDoubleChevron from '../icons/pagination/PageRightDoubleChevron';

interface PaginationContextType {
  current: number;
  setCurrent: (page: number) => void;
  maxPage: number;
  count: number;
}

export const PaginationContext = createContext<PaginationContextType | null>(null);

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('You must use this hook only within the Pagination component.');
  }
  return context;
};

interface PaginationProps {
  /**@param {number} currentPage 현재 화면에 보여줄 페이지 */
  currentPage: number;
  /**@param {number} maxPage 전체 페이지 개수 */
  maxPage: number;
  /**
   * @param {number} count 한 화면에 보여줄 페이지 개수
   * @example << < 1 2 3 4 5 > >> 의 경우 → count == 5
   */
  count: number;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2378&t=cbvmKV4XEswTU85f-4
 */
const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, maxPage, count, ...props }, ref) => {
    const [current, setCurrent] = React.useState<number>(currentPage);

    const currentPageGroup = Math.ceil(current / count);
    const startPage = (currentPageGroup - 1) * count + 1;
    const visiblePageCount = Math.min(maxPage - startPage + 1, count);

    return (
      <PaginationContext.Provider value={{ current, setCurrent, maxPage, count }}>
        <div ref={ref} className="flex flex-row gap-x-2 justify-center" {...props}>
          <span
            className="cursor-pointer"
            onClick={() => {
              const prevPageGroup = Math.floor((current - 1) / count);

              if (prevPageGroup > 0) {
                setCurrent(prevPageGroup * 7);
              } else {
                setCurrent(1);
              }
            }}
          >
            <PageLeftDoubleChevron />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              if (current - 1 > 0) setCurrent((prev) => prev - 1);
            }}
          >
            <PageLeftChevron />
          </span>
          {new Array(visiblePageCount).fill(0).map((_, idx) => {
            idx += 1;

            if (idx % count === current % count) {
              return <PageButton key={idx} page={startPage + idx - 1} variant="current" />;
            } else {
              return <PageButton key={idx} page={startPage + idx - 1} variant="default" />;
            }
          })}
          <span
            className="cursor-pointer"
            onClick={() => {
              if (current + 1 <= maxPage) setCurrent((prev) => prev + 1);
            }}
          >
            <PageRightChevron />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              if (Math.ceil(maxPage / count) > currentPageGroup) {
                setCurrent(currentPageGroup * count + 1);
              } else if (current === maxPage) {
                return;
              } else {
                setCurrent(maxPage);
              }
            }}
          >
            <PageRightDoubleChevron />
          </span>
        </div>
      </PaginationContext.Provider>
    );
  }
);

Pagination.displayName = 'Pagination';

const pageButtonVariants = cva(
  'h-[1.75rem] w-[1.75rem] flex justify-center items-center rounded-[2.5rem] text-sm select-none',
  {
    variants: {
      variant: {
        current: 'bg-gray-700 text-white font-bold',
        default:
          'bg-white border border-gray-200 text-gray-400 font-regular hover:border-gray-300 hover:text-gray-800',
      },
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pageButtonVariants> {
  /**@param {number} page 해당 버튼의 페이지 값 */
  page: number;
  /**@param {string} variant 버튼 스타일(현재 페이지 및 그 외) */
  variant: 'current' | 'default';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2378&t=cbvmKV4XEswTU85f-4
 */
const PageButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ page, variant, className, ...props }, ref) => {
    const { setCurrent } = usePagination();
    return (
      <button
        ref={ref}
        className={cn(pageButtonVariants({ variant }), className)}
        onClick={() => setCurrent(page)}
        {...props}
      >
        {page}
      </button>
    );
  }
);

PageButton.displayName = 'PageButton';

export default Pagination;
