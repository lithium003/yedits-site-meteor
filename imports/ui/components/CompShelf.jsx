import React, { forwardRef } from 'react';
import { CompItem } from './CompItem';

export const CompShelf = forwardRef(({ items }, ref) => {
  // Calculate width: 200px (CompItem width) * 5 + 8px (gap) * 4 + 16px (padding) + 8px (scrollbar) + 16px (idk) + 8px (right padding)
  const shelfWidth = 200 * 5 + 8 * 4 + 16 + 8 + 16 + 8;

  return (
    <>
      <div
        ref={ref}
        style={{ width: `${shelfWidth}px` }}
        className="flex flex-nowrap overflow-x-auto bg-black/50 py-3 px-2 rounded-xl
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-black
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-500
        [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
        "
      >
        {items.map(item => (
          <div
            className="shelf-item flex-shrink-0 first:ml-0 ml-2 mr-2 last:mr-0"
            key={item.id}
          >
            <CompItem comp={item} />
          </div>
        ))}
      </div>
    </>
  );
});
