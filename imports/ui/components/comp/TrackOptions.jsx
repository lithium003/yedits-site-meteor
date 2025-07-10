import React from 'react';
export const TrackOptions = () => {
  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    // Handle the click event, e.g., open a modal or perform an action
    console.log('Track options clicked');
  };

  return (
    <>
      <div
        className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1d] rounded-lg p-4 shadow-lg z-50"
        onClick={handleClick}
      >
        <div className="flex flex-col space-y-2">
          <span>abcd</span>
          <span>EFGH</span>
        </div>
      </div>
    </>
  );
};
