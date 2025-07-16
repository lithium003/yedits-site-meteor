import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const SocialButton = ({ href, icon, bgColor, hoverColor }) => (
  <a
    href={href}
    className={`w-11 h-11 ${bgColor} rounded-full flex items-center justify-center text-white ${hoverColor} transition-all duration-300 hover:scale-110`}
  >
    <span className="text-lg">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);
