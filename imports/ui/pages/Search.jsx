import React, { useEffect, useState } from 'react';
import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';
import { CompItem } from '../components/CompItem';

export const Search = () => {
  const [data, setData] = useState([]);

  const loadNext = () => {
    const lastId = data[data.length - 1]?.id;
    if (!lastId) return;

    Meteor.call('getCompResults', lastId, (err, result) => {
      if (err) {
        console.error('Failed to fetch next comps:', err);
      } else {
        setData(prev => [...prev, ...result]);
      }
    });
  };

  useEffect(() => {
    // On first component render
    Meteor.call('getCompResults', (err, result) => {
      if (err) {
        console.error('Failed to fetch comps:', err);
      } else {
        setData(Array.from(result));
      }
    });
  }, []);

  return (
    <>
      <div>Search</div>
      <CompShelf items={data} />
      {/*{data.map(item => (*/}
      {/*  <div className="px-1" key={item.id}>*/}
      {/*    <CompItem comp={item} />*/}
      {/*  </div>*/}
      {/*))}*/}
      <button onClick={loadNext}>LOAD NEXT 3</button>
    </>
  );
};
