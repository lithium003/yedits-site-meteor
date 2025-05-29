import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { CompItem } from './CompItem';

export const CompShelf = () => {
  const [data, setData] = useState([
    {
      name: 'MISSING NAME',
      yeditor_name: 'MISSING YEDITOR',
      art_path: 'MISSING PATH'
    }
  ]);
  useEffect(() => {
    // On first component render
    Meteor.call('getTop5Comps', (err, result) => {
      if (err) {
        console.error('Failed to fetch comps:', err);
      } else {
        setData(Array.from(result)); // store first item
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-nowrap">
        {data.map(item => (
          <div key={item.name}>
            <CompItem data={item} />
          </div>
        ))}
      </div>
    </>
  );
};
