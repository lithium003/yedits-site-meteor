import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';
import { searchableName } from '/imports/utils/stringUtils';

/**
 * UI for the Search page
 */
export const Search = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const compShelfRef = useRef(null);

  // Get search term from url
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';

  // Hydration problems can occur when the client renders data before server-side rendering can finish.
  // If this happens, make the client-side rendering dependent on isMounted being true.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Loads the next few comps and scrolls to show them
   */

  const loadNext = () => {
    const lastId = data[data.length - 1]?.id;
    if (!lastId || isLoading) return;

    setIsLoading(true);
    const previousLength = data.length;
    Meteor.call(
      'getCompResults',
      { searchTerm: searchableName(searchTerm), lastId: lastId },
      (err, result) => {
        if (err) {
          console.error('Failed to fetch next comps:', err);
          setIsLoading(false);
        } else {
          setData(prev => {
            const newData = [...prev, ...result];
            // Scroll to newly loaded items
            setTimeout(() => {
              scrollToEnd();
              // scrollToNewItems(previousLength);
              setIsLoading(false);
            }, 100); // Small delay to ensure DOM is updated
            return newData;
          });
        }
      }
    );
  };

  /**
   * Scroll to end to show all new items
   */
  const scrollToEnd = () => {
    if (!compShelfRef.current) return;

    compShelfRef.current.scrollTo({
      left: compShelfRef.current.scrollWidth,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll to start of CompShelf
   */
  const scrollToStart = () => {
    if (!compShelfRef.current) return;

    compShelfRef.current.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll to the start of the newly loaded items
   * @param previousLength the number of items in the shelf before loading more
   */
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
      // Fallback: scroll to show new content area TODO?
    }
  };

  useEffect(() => {
    // On first component render, get items with no 'lastItem'
    Meteor.call(
      'getCompResults',
      { searchTerm: searchableName(searchTerm) },
      (err, result) => {
        if (err) {
          console.error('Failed to fetch comps:', err);
        } else {
          setData(Array.from(result));
        }
      }
    );
  }, []);

  return (
    <>
      {/* Horizontally centers the page */}
      <div className="flex justify-center w-full">
        {/* Ensures everything is stacked vertically */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold mb-2">
            Comps matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf
            ref={compShelfRef}
            items={data}
            onLoadNext={loadNext}
            scrollToStart={scrollToStart}
          />
        </div>
      </div>
    </>
  );
};
