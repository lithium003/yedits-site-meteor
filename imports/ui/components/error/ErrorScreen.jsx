import React from 'react';
import { Helmet } from 'react-helmet';
export const ErrorScreen = ({ message }) => {
  return (
    <>
      <Helmet>
        <title>Error - Yedits</title>
      </Helmet>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-gray-400">
          {message || 'Something went wrong'}
        </h1>
      </div>
    </>
  );
};
