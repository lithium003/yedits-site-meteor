import React from 'react';
import { RiLoader2Line } from 'react-icons/ri';

export const ShelfButton = ({
  onClick = () => {},
  loadingMore = false,
  children = null
}) => {
  return (
    <>
      <div className="shelf-item flex-shrink-0 flex items-center">
        <button
          onClick={onClick}
          className="h-[120px] w-[16px] bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white/75 transition-colors"
        >
          {loadingMore ? <RiLoader2Line className="animate-pulse" /> : children}
        </button>
      </div>
    </>
  );
};
