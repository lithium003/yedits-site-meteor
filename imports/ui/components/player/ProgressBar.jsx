import React from 'react';

export const ProgressBar = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-5 w-full">
        <span>00:00</span>
        <input className="max-w-[80%] bg-gray-300" type="range" />
        <span>03:34</span>
      </div>
    </>
  );
};
