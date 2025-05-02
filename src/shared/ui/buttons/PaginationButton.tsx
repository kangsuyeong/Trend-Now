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
  currentPage: number;
  maxPage: number;
  count: number;
}

// JSDoc 추가하기
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
            } else if (
              idx === current - (currentPageGroup - 1) * count - 1 ||
              idx === current - (currentPageGroup - 1) * count + 1
            ) {
              return <PageButton key={idx} page={startPage + idx - 1} variant="adjacent" />;
            } else {
              return <PageButton key={idx} page={startPage + idx - 1} variant="others" />;
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
        adjacent: 'bg-white border border-gray-300 text-gray-800 font-regular',
        others: 'bg-white border border-gray-200 text-gray-400 font-regular',
      },
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pageButtonVariants> {
  page: number;
  variant: 'current' | 'adjacent' | 'others';
}

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
