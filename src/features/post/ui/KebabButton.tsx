import React from 'react';

export default function KebabButton() {
  return (
    <input
      type="checkbox"
      className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-8 before:w-8 before:content-[url('/images/icons/icon_kebab_32x32.svg')]"
    />
  );
}
