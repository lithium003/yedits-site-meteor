import React from 'react';

export const CompItemSkeleton = () => {
  return (
    <div className="w-[200px] flex flex-col items-center justify-center">
      {/* Image placeholder with proper bottom margin */}
      <div className="w-full h-[200px] rounded-xl bg-gray-700/30 animate-pulse mb-1"></div>

      {/* Container for text with proper spacing */}
      <div className="w-full flex flex-col items-center space-y-2 mt-2">
        {/* Name placeholder */}
        <div className="w-4/5 h-5 bg-gray-700/30 animate-pulse rounded"></div>

        {/* Yeditor name placeholder */}
        <div className="w-2/3 h-4 bg-gray-700/30 animate-pulse rounded"></div>
      </div>
    </div>
  );
};
