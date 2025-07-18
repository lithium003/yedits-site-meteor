import React from 'react';

export const TrackSkeleton = () => (
  <div className="relative">
    <div
      className="
        flex items-center justify-between
        text-white
        rounded px-4
        bg-gray-800 animate-pulse
        min-h-[56px]
      "
    >
      {/* Track number skeleton */}
      <span className="w-8 text-center flex items-center justify-center">
        <div className="h-6 w-6 bg-gray-700/40 rounded" />
      </span>
      {/* Name skeleton */}
      <span className="flex-1 px-4 flex items-center">
        <div className="h-6 w-3/4 bg-gray-700/40 rounded" />
      </span>
      {/* Length and options skeleton */}
      <div className="flex items-center text-[#A2A2EE] text-right">
        <span className="w-16 px-4 flex items-center">
          <div className="h-6 w-12 bg-gray-700/40 rounded mx-auto" />
        </span>
        {/* Options skeleton box */}
        <div className="w-8 h-2 bg-gray-700/40 rounded mx-2" />
      </div>
    </div>
  </div>
);
