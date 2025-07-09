import React from 'react';

export const PillCheckbox = ({
  label = null,
  type = 'tag',
  checked = true,
  onChange = () => {},
  activeColor = 'bg-blue-500',
  inactiveColor = 'bg-gray-300',
  textColor = 'text-white',
  className = ''
}) => {
  return (
    <>
      <label className={`inline-flex items-center cursor-pointer ${className}`}>
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
        `}
        >
          {label}
        </span>
      </label>
    </>
  );
};
