import React from 'react';

export default function BookmarkButton() {
  return (
    <input
      type="checkbox"
      className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_bookmark_24x24.svg')] checked:before:content-[url('/images/icons/icon_bookmark_active_24x24.svg')]"
    />
  );
}
