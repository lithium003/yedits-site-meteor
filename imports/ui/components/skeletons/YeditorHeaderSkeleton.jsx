import React from 'react';

export const YeditorHeaderSkeleton = () => (
  <section className="text-center mb-8">
    <div className="flex items-center justify-center gap-12 max-w-5xl">
      {/* Photo Skeleton */}
      <div className="relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500 bg-gray-700/30 animate-pulse" />
      </div>

      {/* Info Skeleton */}
      <div className="flex-1 text-left">
        {/* Title skeleton */}
        <div className="h-[3.5rem] w-3/4 bg-gray-700/30 animate-pulse rounded mb-4" />
        {/* Bio skeleton */}
        <div className="h-6 w-2/3 bg-gray-700/30 animate-pulse rounded mb-6" />
        {/* Social buttons skeleton */}
        <div className="flex gap-4 flex-wrap">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-full bg-gray-700/30 animate-pulse"
              />
            ))}
        </div>
      </div>
    </div>
  </section>
);
