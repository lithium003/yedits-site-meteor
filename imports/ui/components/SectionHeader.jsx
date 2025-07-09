import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SectionHeader = ({ title, icon = null, showDivider = true }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-4">
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {title}
    </h2>
    {showDivider && (
      <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
    )}
  </div>
);
