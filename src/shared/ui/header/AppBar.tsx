import React from 'react';
import Trendnow from '../icons/Trendnow';

const Appbar = () => {
  return (
    <header className="h-20 w-full flex py-4 px-screenXPadding">
      <div className="w-full flex justify-between">
        <span className="bg-red-500">
          <Trendnow />
        </span>
        <span className="w-[28.75rem] h-full bg-blue-500">haha</span>
        <span className="bg-green-500">Trendnow</span>
      </div>
    </header>
  );
};

export default Appbar;
