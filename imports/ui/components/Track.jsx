import React from 'react';

export const Track = ({ edit }) => {
  const { filepath, number, name, length } = edit;

  return (
    <>
      <div className="flex items-center justify-between text-white font-mono">
        <span className="w-8 text-center">{number}</span>
        <span className="flex-1 px-4 truncate">{name}</span>
        <span className="w-16 text-right px-4">{length}</span>
      </div>
    </>
  );
};
