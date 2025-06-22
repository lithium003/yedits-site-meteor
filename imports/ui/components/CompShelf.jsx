import React from 'react';
import { CompItem } from './CompItem';

export const CompShelf = ({ items }) => {
  return (
    <>
      <div
        className="flex flex-nowrap bg-black/50 py-3 px-1 rounded-xl overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-black
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-500
        [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
        "
      >
        {items.map(item => (
          <div className="px-1" key={item.id}>
            <CompItem comp={item} />
          </div>
        ))}
      </div>
    </>
  );
};
