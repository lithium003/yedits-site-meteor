import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';
import { searchableName } from '/imports/utils/stringUtils';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';

/**
 * UI for the Search page
 */
export const Search = () => {
  const [comps, setComps] = useState([]);
  const [edits, setEdits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const compsShelfRef = useRef(null);
  const editsShelfRef = useRef(null);

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
  // TODO: a way to pass around the collection name, state variable, setter, and ref for each collection together
  const loadNext = (collection, state, setState, shelfRef) => {
    const lastId = state[state.length - 1]?.id;
    if (!lastId || isLoading) return;

    setIsLoading(true);
    const previousLength = state.length;
    Meteor.call(
      'getSearchResults',
      {
        collection: collection,
        searchTerm: searchableName(searchTerm),
        lastId: lastId
      },
      (err, result) => {
        if (err) {
          console.error('Failed to fetch next results:', err);
          setIsLoading(false);
        } else {
          setState(prev => {
            const newData = [...prev, ...result];
            // Scroll to newly loaded items
            setTimeout(() => {
              scrollToEnd(shelfRef);
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
  const scrollToEnd = shelfRef => {
    if (!shelfRef.current) return;

    shelfRef.current.scrollTo({
      left: shelfRef.current.scrollWidth,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll to start of CompShelf
   */
  const scrollToStart = shelfRef => {
    if (!shelfRef.current) return;

    shelfRef.current.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll to the start of the newly loaded items
   * @param previousLength the number of items in the shelf before loading more
   */
  const scrollToNewItems = previousLength => {
    if (!compsShelfRef.current) return;
    const shelfElement = compsShelfRef.current;

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
    const searchCollections = [
      { collection: COMPS, setState: setComps },
      { collection: EDITS, setState: setEdits }
    ];
    searchCollections.forEach(type => {
      Meteor.call(
        'getSearchResults',
        { collection: type.collection, searchTerm: searchableName(searchTerm) },
        (err, result) => {
          if (err) {
            console.error('Failed to fetch results:', err);
          } else {
            type.setState(Array.from(result));
          }
        }
      );
    });
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
          {/* Comps Shelf */}
          <CompShelf
            ref={compsShelfRef}
            items={comps}
            onLoadNext={() => loadNext(COMPS, comps, setComps, compsShelfRef)}
            scrollToStart={() => scrollToStart(compsShelfRef)}
          />
          <h1 className="text-xl font-bold mb-2">
            Edits matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          {/* Edits Shelf */}
          <CompShelf
            ref={editsShelfRef}
            items={edits}
            onLoadNext={() => loadNext(EDITS, edits, setEdits, editsShelfRef)}
            scrollToStart={() => scrollToStart(editsShelfRef)}
          />
        </div>
      </div>
    </>
  );
};
