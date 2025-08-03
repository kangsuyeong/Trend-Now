'use client';
import { axiosGetAutocomplete } from '@/shared/api';
import { AutoComplete } from '@/shared/types';
import { Search24 } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState(''); // 디바운스 키워드
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const queryKeyword = useSearchParams().get('keyword');

  // debounce 함수 설정
  const debouncedSetKeyword = useCallback(
    debounce((val: string) => setDebouncedKeyword(val), 300),
    []
  );

  // 하이라이트 함수
  const highlightMatch = (text: string, keyword: string) => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={i} className="font-bold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  useEffect(() => {
    setKeyword(queryKeyword || '');
  }, [queryKeyword]);

  // keyword 입력 시 debounce 처리
  useEffect(() => {
    debouncedSetKeyword(keyword);
    return () => debouncedSetKeyword.cancel(); // cleanup
  }, [keyword, debouncedSetKeyword]);

  // 컴포넌트 외부 클릭 시 자동완성 닫기 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 자동완성 API 호출
  const { data: suggestions } = useQuery({
    queryKey: ['autoComplete', debouncedKeyword],
    queryFn: () => axiosGetAutocomplete<AutoComplete[]>(debouncedKeyword),
    enabled: !!debouncedKeyword.trim(),
  });

  // 엔터 눌렀을때 실행되는 함수
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!keyword || keyword === queryKeyword) return; // 현재 value와 쿼리스트링이 같으면 실행 X
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[28.75rem]">
      <div className="flex items-center justify-between gap-2 rounded-full border border-gray-200 bg-gray-100 px-5 py-3 has-[:focus]:border-gray-400">
        <input
          type="search"
          placeholder="원하는 검색어를 입력해주세요."
          value={keyword}
          className="flex-1 bg-transparent text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>
          <Search24 className={keyword.length > 0 ? 'fill-gray-900' : 'fill-gray-400'} />
        </button>
      </div>
      {isOpen && suggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 top-[60px] z-20 flex w-full flex-col rounded-2xl bg-white px-2 py-3.5 shadow-[0_2px_24px_rgba(0,0,0,0.08)]">
          {suggestions.map((s) => (
            <li key={s.boardId} className="rounded-lg hover:bg-gray-100">
              <Link
                href={`/search?keyword=${encodeURIComponent(s.boardName)}`}
                className="block h-full w-full px-3 py-2 text-md"
              >
                {highlightMatch(s.boardName, keyword)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
