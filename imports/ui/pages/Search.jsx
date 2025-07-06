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

  // Get search term from url
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';
  const eraFilter = searchParams.get('e') ?? '';
  const tagFilters = searchParams.getAll('t');
  const artistFilter = searchParams.get('a') ?? '';

  // Hydration problems can occur when the client renders data before server-side rendering can finish.
  // If this happens, make the client-side rendering dependent on isMounted being true.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define your Meteor call function directly
  const meteorCallFunction = (collection, lastId, onSuccess, onError) => {
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
          onError(err);
        } else {
          onSuccess(result);
        }
      }
    );
  };

  // Define your objects after the loadNext function
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

  useEffect(() => {
    // TODO abstract this to just calling the same thing as loadNext but with no lastId
    // On first component render, get items with no 'lastItem'
    objects.forEach(type => {
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
            meteorCallFunction={meteorCallFunction}
            obj={compsObj}
          />
          {/* Edits Shelf */}
          <h1 className="text-xl font-bold mb-2">
            Edits matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf
            ref={editsShelfRef}
            items={edits}
            meteorCallFunction={meteorCallFunction}
            obj={editsObj}
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
                meteorCallFunction={meteorCallFunction}
                obj={yeditorsObj}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
