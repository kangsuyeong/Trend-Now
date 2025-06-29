'use client';

import { cn } from '@/shared/lib/';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import PageLeftDoubleChevron from '../icons/pagination/PageLeftDoubleChevron';
import PageLeftChevron from '../icons/pagination/PageLeftChevron';
import PageRightChevron from '../icons/pagination/PageRightChevron';
import PageRightDoubleChevron from '../icons/pagination/PageRightDoubleChevron';

interface PaginationProps {
  /**@param {number} currentPage 현재 화면에 보여줄 페이지 */
  currentPage: number;
  /**@param {function} setPage 상위 컴포넌트에서 페이지를 설정하는 함수 */
  setPage: (page: number) => void;
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
const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, setPage, maxPage, count, ...props }, ref) => {
    // 현재 페이지가 속한 페이지 그룹 (예: 6페이지면 2번째 그룹)
    const currentPageGroup = Math.ceil(currentPage / count);

    // 현재 그룹의 시작 페이지 번호 계산
    const startPage = (currentPageGroup - 1) * count + 1;

    // 실제로 렌더링할 페이지 수 (마지막 그룹일 경우 count보다 작을 수 있음)
    const visiblePageCount = Math.min(maxPage - startPage + 1, count);

    // << 버튼 클릭 시, 이전 페이지 그룹으로 이동
    const handleFirstGroup = () => {
      const prevPageGroup = Math.floor((currentPage - 1) / count);
      setPage(prevPageGroup > 0 ? prevPageGroup * count : 1);
    };

    // < 버튼 클릭 시, 이전 페이지로 이동
    const handlePrev = () => {
      if (currentPage > 1) setPage(currentPage - 1);
    };

    // > 버튼 클릭 시, 다음 페이지로 이동
    const handleNext = () => {
      if (currentPage < maxPage) setPage(currentPage + 1);
    };

    // >> 버튼 클릭 시, 다음 페이지 그룹으로 이동
    const handleLastGroup = () => {
      const lastGroup = Math.ceil(maxPage / count);
      if (currentPageGroup < lastGroup) {
        setPage(currentPageGroup * count + 1);
      } else {
        setPage(maxPage);
      }
    };

    return (
      <div ref={ref} className="flex flex-row justify-center gap-x-2" {...props}>
        <span className="cursor-pointer" onClick={handleFirstGroup}>
          <PageLeftDoubleChevron />
        </span>
        <span className="cursor-pointer" onClick={handlePrev}>
          <PageLeftChevron />
        </span>
        {Array.from({ length: visiblePageCount }, (_, idx) => {
          const page = startPage + idx;
          const variant = page === currentPage ? 'current' : 'default';
          return (
            <PageButton key={page} page={page} variant={variant} onClick={() => setPage(page)} />
          );
        })}
        <span className="cursor-pointer" onClick={handleNext}>
          <PageRightChevron />
        </span>
        <span className="cursor-pointer" onClick={handleLastGroup}>
          <PageRightDoubleChevron />
        </span>
      </div>
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
          'bg-white border border-gray-200 text-gray-400 font-medium hover:border-gray-300 hover:text-gray-800',
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
const PageButton = ({ page, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(pageButtonVariants({ variant }), className)} {...props}>
      {page}
    </button>
  );
};

export default Pagination;
