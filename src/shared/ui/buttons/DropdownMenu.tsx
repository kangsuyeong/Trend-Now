'use client';
import { cn } from '@/shared/lib';
import { useEffect, useRef, useState } from 'react';

interface DropdownMenuProps {
  /** 드롭다운을 여는 트리거 요소 */
  trigger: React.ReactNode;

  /** 드롭다운 내부에 표시될 콘텐츠 (메뉴 항목 등) */
  children: React.ReactNode;

  /** 드롭다운 wrapper에 적용할 클래스명 */
  className?: string;
}

const DropdownMenu = ({ trigger, className, children }: DropdownMenuProps) => {
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false); // 메뉴 열림 상태

  const buttonRef = useRef<HTMLButtonElement>(null); // 트리거 버튼 ref
  const menuRef = useRef<HTMLUListElement>(null); // 메뉴 리스트 ref

  // 메뉴 열림/닫힘 토글
  const handleDropMenuToggle = () => {
    setDropMenuOpen((prev) => !prev);
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleDropMenuClose = (e: MouseEvent) => {
      if (
        dropMenuOpen &&
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setDropMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDropMenuClose);
    return () => {
      document.removeEventListener('click', handleDropMenuClose);
    };
  }, [dropMenuOpen]);

  return (
    <div className="relative select-none">
      {/* 메뉴를 여는 트리거 버튼 */}
      <button ref={buttonRef} onClick={handleDropMenuToggle} className="cursor-pointer">
        {trigger}
      </button>
      {/* 드롭다운 메뉴 리스트 */}
      {dropMenuOpen && (
        <ul
          ref={menuRef}
          className={cn(
            'absolute right-0 z-10 mt-2 flex w-[10rem] flex-col gap-y-1 rounded-xl bg-white p-3 shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.08)]',
            className
          )}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
