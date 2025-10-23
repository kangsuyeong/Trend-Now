import { Trendnow } from '@/shared/ui/';
import Link from 'next/link';
import { SearchBar } from '@/features/searchBar';
import { Suspense } from 'react';
import { UserServerComponent } from '@/features/header';

const Appbar = () => {
  return (
    <header className="fixed z-20 flex h-20 w-full items-center justify-center border-b border-gray-200 bg-white px-8">
      <div className="flex w-[78rem] items-center justify-between">
        <Link href={`/`} className="w-[12.5rem] cursor-pointer">
          <Trendnow />
        </Link>
        <Suspense>
          <SearchBar />
        </Suspense>
        <div className="flex w-[12.5rem] justify-end">
          <UserServerComponent />
        </div>
      </div>
    </header>
  );
};

export default Appbar;
