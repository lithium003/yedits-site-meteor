import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { CompItem } from './CompItem';

export const CompShelf = () => {
  const [data, setData] = useState([
    {
      id: 'MISSING ID',
      name: 'MISSING NAME',
      yeditor: 'MISSING YEDITOR ID',
      yeditor_name: 'MISSING YEDITOR NAME',
      art_path: 'MISSING PATH'
    }
  ]);
  useEffect(() => {
    // On first component render
    Meteor.call('getTop5Comps', (err, result) => {
      if (err) {
        console.error('Failed to fetch comps:', err);
      } else {
        setData(Array.from(result));
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-nowrap bg-black/70">
        {data.map(item => (
          <div className="px-1" key={item.id}>
            <CompItem comp={item} />
          </div>
        ))}
      </div>
    </>
  );
};
