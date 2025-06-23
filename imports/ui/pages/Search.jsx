import React, { useEffect, useRef, useState } from 'react';
import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';

/**
 * UI for the Search page
 */
export const Search = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const compShelfRef = useRef(null);

  /**
   * Loads the next few comps and scrolls to show them
   */
  const loadNext = () => {
    const lastId = data[data.length - 1]?.id;
    if (!lastId || isLoading) return;

    setIsLoading(true);
    const previousLength = data.length;

    Meteor.call('getCompResults', lastId, (err, result) => {
      if (err) {
        console.error('Failed to fetch next comps:', err);
        setIsLoading(false);
      } else {
        setData(prev => {
          const newData = [...prev, ...result];
          // Scroll to newly loaded items
          setTimeout(() => {
            scrollToNewItems(previousLength);
            setIsLoading(false);
          }, 100); // Small delay to ensure DOM is updated
          return newData;
        });
      }
    });
  };

  const scrollToNewItems = previousLength => {
    if (!compShelfRef.current) return;
    const shelfElement = compShelfRef.current;

    // Scroll to the first new item
    const firstNewItemIndex = previousLength;
    const compItems = shelfElement.querySelectorAll('.shelf-item');
    if (compItems[firstNewItemIndex]) {
      compItems[firstNewItemIndex].scrollIntoView({
        behavior: 'smooth', // TODO consider a custom speed or instant
        block: 'nearest',
        inline: 'start'
      });
    } else {
      // Fallback: scroll to show new content area
    }
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
      <CompShelf ref={compShelfRef} items={data} />
      <button className="bg-amber-700" onClick={loadNext} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </>
  );
};
