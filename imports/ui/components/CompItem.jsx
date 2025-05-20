import React from 'react';
export const CompItem = () => {
  return (
    <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
      <img
        className="w-full h-[200px] rounded-xl object-cover"
        src="/music/bMQyVSBYkBhWGclF1OvL/gYxs5vSDQXPljdTBc1Fs/COVER_-_FRONT.jpg"
        alt="title"
      />
      <p className="bg-red-500 text-center w-full">Title</p>
      <p className="bg-gray-500 text-center w-full">Yeditor</p>
    </div>
  );
};
