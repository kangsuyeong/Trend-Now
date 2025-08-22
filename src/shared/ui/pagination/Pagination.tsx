'use client';

import { cn } from '@/shared/lib/';
import { cva } from 'class-variance-authority';
import { forwardRef, ReactNode } from 'react';
import PageLeftDoubleChevron from '../icons/pagination/PageLeftDoubleChevron';
import PageLeftChevron from '../icons/pagination/PageLeftChevron';
import PageRightChevron from '../icons/pagination/PageRightChevron';
import PageRightDoubleChevron from '../icons/pagination/PageRightDoubleChevron';
import Link from 'next/link';

interface PaginationProps {
  /**@param {number} currentPage 현재 화면에 보여줄 페이지 */
  currentPage: number;
  /**@param {function} setPage 상위 컴포넌트에서 페이지를 설정하는 함수 */
  setPage?: (page: number) => void;
  /**@param {number} maxPage 전체 페이지 개수 */
  maxPage: number;
  /**
   * @param {number} count 한 화면에 보여줄 페이지 개수
   * @example << < 1 2 3 4 5 > >> 의 경우 → count == 5
   */
  count: number;
  getHref?: (page: number) => string;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2378&t=cbvmKV4XEswTU85f-4
 */
const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, setPage, maxPage, count, getHref, ...props }, ref) => {
    // 현재 페이지가 속한 페이지 그룹 (예: 6페이지면 2번째 그룹)
    const currentPageGroup = Math.ceil(currentPage / count);

    // 현재 그룹의 시작 페이지 번호 계산
    const startPage = (currentPageGroup - 1) * count + 1;

    // 실제로 렌더링할 페이지 수 (마지막 그룹일 경우 count보다 작을 수 있음)
    const visiblePageCount = Math.min(maxPage - startPage + 1, count);

    // 전체 페이지 그룹 수
    const lastGroup = Math.ceil(maxPage / count);

    // << 버튼 클릭 시 이동할 첫 페이지 번호
    // 이전 그룹이 있으면 해당 그룹의 첫 페이지, 없으면 1페이지
    const prevGroupTarget =
      Math.floor((currentPage - 1) / count) > 0 ? Math.floor((currentPage - 1) / count) * count : 1;

    // < 버튼 클릭 시 이동할 페이지 번호 (최소 1페이지)
    const prevTarget = currentPage > 1 ? currentPage - 1 : 1;

    // > 버튼 클릭 시 이동할 페이지 번호 (최대 maxPage)
    const nextTarget = currentPage < maxPage ? currentPage + 1 : maxPage;

    // >> 버튼 클릭 시 이동할 페이지 번호
    // 다음 그룹이 있으면 다음 그룹 첫 페이지, 없으면 마지막 페이지
    const lastGroupTarget = currentPageGroup < lastGroup ? currentPageGroup * count + 1 : maxPage;

    return (
      <div ref={ref} className="flex flex-row justify-center gap-x-2" {...props}>
        <PageButton
          className="cursor-pointer"
          href={getHref?.(prevGroupTarget)}
          onClick={() => setPage?.(prevGroupTarget)}
        >
          <PageLeftDoubleChevron />
        </PageButton>
        <PageButton
          className="cursor-pointer"
          href={getHref?.(prevTarget)}
          onClick={() => setPage?.(prevTarget)}
        >
          <PageLeftChevron />
        </PageButton>
        {Array.from({ length: visiblePageCount }, (_, idx) => {
          const page = startPage + idx;
          const variant = page === currentPage ? 'current' : 'default';
          return (
            <PageButton
              key={page}
              variant={variant}
              href={getHref?.(page)}
              onClick={() => setPage?.(page)}
            >
              {page}
            </PageButton>
          );
        })}

        <PageButton
          className="cursor-pointer"
          href={getHref?.(nextTarget)}
          onClick={() => setPage?.(nextTarget)}
        >
          <PageRightChevron />
        </PageButton>
        <PageButton
          className="cursor-pointer"
          href={getHref?.(lastGroupTarget)}
          onClick={() => setPage?.(lastGroupTarget)}
        >
          <PageRightDoubleChevron />
        </PageButton>
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

interface ButtonProps {
  /** 버튼 스타일(현재 페이지 및 그 외) */
  variant?: 'current' | 'default';
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  href?: string;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-2378&t=cbvmKV4XEswTU85f-4
 */
const PageButton = ({ variant, className, onClick, href, children }: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} className={cn(variant && pageButtonVariants({ variant }), className)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cn(variant && pageButtonVariants({ variant }), className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Pagination;
