import { cn } from '@/shared/lib';

interface DropdownMenuItemProps {
  /** 메뉴 항목에 표시될 내용 */
  children: React.ReactNode;

  /** 메뉴 항목 클릭 시 실행할 콜백 */
  // 옵셔널 추후 삭제
  onClick?: () => void;

  /** 추가로 적용할 클래스명 (선택) */
  className?: string;
}

export default function DropdownMenuItem({ children, onClick, className }: DropdownMenuItemProps) {
  return (
    <li>
      <button
        className={cn(
          'flex h-11 w-full cursor-pointer items-center gap-1.5 rounded-xl p-2 text-md font-medium text-gray-800 hover:bg-gray-100',
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}
