import React from 'react';
import { PillCheckbox } from '../search/PillCheckbox';

export const HeaderTag = ({ label, style = {}, icon = null }) => {
  return (
    <>
      <PillCheckbox
        label={label}
        style={style}
        icon={icon}
        type="tag"
        activeColor="bg-blue-500"
        inactiveColor="bg-gray-300"
        textColor="text-white"
        className="px-0.5"
      />
    </>
  );
};
