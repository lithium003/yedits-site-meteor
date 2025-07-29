import React from 'react';
/**
 * Container for page content that should be horizontally centered.
 * @param {*} children - The content to be centered
 * @returns
 */
export const CenteredPage = ({ children }) => {
  return <div className="flex justify-center w-full">{children}</div>;
};
