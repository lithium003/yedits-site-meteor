import React from 'react';
import { useParams } from 'react-router-dom';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  return (
    <>
      <span>{yeditorId}</span>
    </>
  );
};
