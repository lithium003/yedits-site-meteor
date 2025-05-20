import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const CompItem = () => {
  const [data, setData] = useState();

  useEffect(() => {
    // On first component render
    Meteor.call('getTop5Comps', (err, result) => {
      if (err) {
        console.error('Failed to fetch comps:', err);
      } else {
        setData(result[0]); // store first item
      }
    });
  }, []);

  function convertPath(input) {
    // Remove the leading '/static'
    let output = input.replace(/^\/static/, '');

    // Replace all backslashes with forward slashes
    output = output.replace(/\\/g, '/');

    // Remove the trailing '.webp' extension
    output = output.replace(/\.webp$/, '');

    return output;
  }

  // Destructure fields from the first item
  const { name, yeditor_name, art_path } = data;
  const mod_art_path = convertPath(art_path);

  return (
    <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
      <img
        className="w-full h-[200px] rounded-xl object-cover"
        src={mod_art_path}
        alt="title"
      />
      <p className="bg-red-500 text-center w-full">{name}</p>
      <p className="bg-gray-500 text-center w-full">{yeditor_name}</p>
    </div>
  );
};
