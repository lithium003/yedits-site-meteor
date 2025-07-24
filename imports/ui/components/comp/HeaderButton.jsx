import React from 'react';
import { PillCheckbox } from '../search/PillCheckbox';

export const HeaderButton = ({
  label,
  style = {},
  icon = null,
  onClick = () => {}
}) => {
  return (
    <>
      <PillCheckbox
        label={label}
        style={style}
        icon={icon}
        onClick={onClick}
        type="tag"
        activeColor="bg-blue-500"
        inactiveColor="bg-gray-300"
        textColor="text-white"
        className="px-0.5"
        pillClassName="text-2xl px-6 py-3"
      />
    </>
  );
};
//
