'use client';
import { useEffect, useRef, useState } from 'react';

interface DropdownmenuProps {
  trigger: React.ReactNode; // 드롭다운을 여는 버튼
  items: DropdownMenuItemProps[]; // 드롭다운 메뉴 항목 목록
}

const Dropdownmenu = ({ trigger, items }: DropdownmenuProps) => {
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
          className="absolute right-0 z-10 mt-2 flex w-[10rem] flex-col gap-y-1 rounded-xl bg-white p-3 shadow-[0px_2px_10px_0px_rgba(0,_0,_0,_0.08)]"
        >
          {items.map((item, idx) => (
            <DropdownMenuItem key={idx} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdownmenu;

interface DropdownMenuItemProps {
  content: React.ReactNode;
  // 추후 옵셔널 제거
  onClick?: () => void;
}

const DropdownMenuItem = ({ content, onClick }: DropdownMenuItemProps) => {
  return (
    <li>
      <button
        className="flex h-11 w-full cursor-pointer items-center gap-1.5 rounded-xl p-2 text-md font-medium text-gray-800 hover:bg-gray-100"
        onClick={onClick}
      >
        {content}
      </button>
    </li>
  );
};
