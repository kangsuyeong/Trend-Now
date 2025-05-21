import Pagination from '@/shared/ui/buttons/PaginationButton';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[800px] p-[16px]">
        {/* Page Button */}
        <div className="text-1xl font-regular py-[8px]">PAGE BUTTON</div>
        <div className="flex flex-row items-center">
          <Pagination currentPage={1} maxPage={20} count={7} />
        </div>
      </div>
    </div>
  );
};

export default page;
