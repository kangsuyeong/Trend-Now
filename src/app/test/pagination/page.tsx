// import { Pagination } from '@/shared/ui/';
import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[800px] flex-col p-[16px]">
        {/* Page Button */}
        <div className="py-[8px] text-1xl font-medium">PAGE BUTTON</div>
        <div className="flex flex-row items-center">
          {/* <Pagination currentPage={1} maxPage={20} count={7} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
