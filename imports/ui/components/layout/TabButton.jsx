import React from 'react';

export const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative ${
      isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
    )}
  </button>
);
