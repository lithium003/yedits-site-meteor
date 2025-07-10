import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const PillCheckbox = ({
  label = null,
  icon = null,
  type = 'tag',
  checked = true,
  onChange = () => {},
  onClick = null,
  activeColor = 'bg-blue-500',
  inactiveColor = 'bg-gray-300',
  textColor = 'text-white',
  className = '',
  pillClassName = ''
}) => {
  return (
    <>
      <label
        className={`inline-flex items-center cursor-pointer ${onClick && 'hover:brightness-80'} ${className}`}
        onClick={onClick}
      >
        {type === 'checkbox' && (
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="hidden"
          />
        )}

        <span
          className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
        ${checked ? `${activeColor} ${textColor}` : `${inactiveColor} text-gray-600`}
        hover:shadow-md transform hover:scale-105
        ${pillClassName}
        `}
        >
          {icon && (
            <>
              <span className="">
                <FontAwesomeIcon icon={icon} />
              </span>{' '}
              {/* Space between */}
            </>
          )}
          {label}
        </span>
      </label>
    </>
  );
};
