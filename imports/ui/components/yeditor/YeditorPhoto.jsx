import React from 'react';
import { Link } from 'react-router-dom';

export const YeditorPhoto = ({ yeditor, size }) => {
  const { id, art_path, display_name } = yeditor;
  return (
    <>
      <Link to={`/yeditor/${id}`}>
        <img
          className={`rounded-full object-cover h-[${size}px] w-[${size}px]}`}
          src={art_path}
          alt={display_name}
        />
      </Link>
    </>
  );
};
