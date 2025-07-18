import React from 'react';

export const CompHeaderSkeleton = () => (
  <section className="text-center mb-8 w-full">
    <div className="flex items-start justify-center gap-12 border-t-4 border-purple-600 bg-[#2c2c2d] rounded-4xl px-8 py-6">
      {/* Comp Art Skeleton */}
      <div className="mt-4 w-64 h-64 rounded-xl overflow-hidden bg-gray-700/30 animate-pulse" />
      {/* Comp Info Skeleton */}
      <div className="flex-1 items-start text-left">
        {/* Title skeleton */}
        <div className="mt-4 h-18 w-3/4 bg-gray-700/30 animate-pulse rounded mb-4" />
        {/* Yeditor name skeleton */}
        <div className="h-7 w-1/4 bg-gray-700/30 animate-pulse rounded mb-2" />
        {/* Description skeleton */}
        <div className="h-15 w-7/8 bg-gray-700/30 animate-pulse rounded mb-4" />
        {/* Tag skeletons */}
        <div className="flex gap-2 mb-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-7 w-24 bg-gray-700/30 animate-pulse rounded"
              />
            ))}
        </div>
        {/* Action skeletons */}
        <div className="flex gap-4 mb-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 bg-gray-700/30 animate-pulse rounded"
              />
            ))}
        </div>
      </div>
    </div>
  </section>
);
