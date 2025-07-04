import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';
import { searchableName } from '/imports/utils/stringUtils';
import {
  COMPS,
  EDITS,
  YEDITORS
} from '../../api/collections/AvailableCollections';
import { YeditorItem } from '../components/YeditorItem';

/**
 * UI for the Search page
 */
export const Search = () => {
  const [comps, setComps] = useState([]);
  const [edits, setEdits] = useState([]);
  const [yeditors, setYeditors] = useState([]);

  const compsShelfRef = useRef(null);
  const editsShelfRef = useRef(null);
  const yeditorsShelfRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const compsObj = {
    collection: COMPS,
    shelfRef: compsShelfRef,
    state: comps,
    setState: setComps
  };
  const editsObj = {
    collection: EDITS,
    shelfRef: editsShelfRef,
    state: edits,
    setState: setEdits
  };
  const yeditorsObj = {
    collection: YEDITORS,
    shelfRef: yeditorsShelfRef,
    state: yeditors,
    setState: setYeditors
  };
  const objects = [compsObj, editsObj, yeditorsObj];
  // Get search term from url
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';
  const eraFilter = searchParams.get('e') ?? '';
  const tagFilters = searchParams.getAll('t');
  const artistFilter = searchParams.get('a') ?? '';
  console.log('tag in Search.jsx:', tagFilters);

  // Hydration problems can occur when the client renders data before server-side rendering can finish.
  // If this happens, make the client-side rendering dependent on isMounted being true.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Loads the next few comps and scrolls to show them
   */
  const loadNext = ({ collection, shelfRef, state, setState }) => {
    // TODO: find a way to pass around the collection name, state variable, setter, and ref for each collection together
    const lastId = state[state.length - 1]?.id;
    if (!lastId || isLoading) return;

    setIsLoading(true);
    Meteor.call(
      'getSearchResults',
      {
        collection: collection,
        searchTerm: searchableName(searchTerm),
        era: eraFilter,
        tags: tagFilters,
        artistId: artistFilter,
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
    // TODO abstract this to just calling the same thing as loadNext but with no lastId
    // On first component render, get items with no 'lastItem'
    objects.forEach(type => {
      console.log('calling for', type);
      Meteor.call(
        'getSearchResults',
        {
          collection: type.collection,
          searchTerm: searchableName(searchTerm),
          era: eraFilter,
          tags: tagFilters,
          artistId: artistFilter
        },
        (err, result) => {
          if (err) {
            console.error('Failed to fetch results:', err);
          } else {
            type.setState(Array.from(result));
          }
        }
      );
    });
  }, [searchParams]);

  return (
    <>
      {/* Horizontally centers the page */}
      <div className="flex justify-center w-full">
        {/* Ensures everything is stacked vertically */}
        <div className="flex flex-col">
          {/* Comps Shelf */}
          <h1 className="text-xl font-bold mb-2">
            Comps matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf
            ref={compsShelfRef}
            items={comps}
            onLoadNext={() => loadNext(compsObj)}
            scrollToStart={() => scrollToStart(compsShelfRef)}
          />
          {/* Edits Shelf */}
          <h1 className="text-xl font-bold mb-2">
            Edits matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf
            ref={editsShelfRef}
            items={edits}
            onLoadNext={() => loadNext(editsObj)}
            scrollToStart={() => scrollToStart(editsShelfRef)}
          />
          {/* Yeditors Shelf */}
          {/* (don't display if searching for an era, as yeditors don't have eras) */}
          {/* TODO could somehow change the getSearchResults Meteor method (or its calling logic) to only look for yeditors if yeditorsShelfRef exists.
           TODO this would be more maintainable than manually checking for eraFilter in the Method */}
          {!eraFilter && (
            <>
              <h1 className="text-xl font-bold mb-2">
                Yeditors matching {isMounted ? `"${searchTerm}"` : ''}
              </h1>
              <CompShelf
                ItemComponent={YeditorItem}
                ref={yeditorsShelfRef}
                items={yeditors}
                onLoadNext={() => loadNext(yeditorsObj)}
                scrollToStart={() => scrollToStart(yeditorsShelfRef)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
