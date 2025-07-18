import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  COMPS,
  EDITS,
  YEDITORS
} from '../../api/collections/AvailableCollections';
import { useMeteorLoader } from '../../hooks/useMeteorLoader';
import { CompShelf } from '../components/display/CompShelf';
import { searchableName } from '/imports/utils/stringUtils';

/**
 * UI for the Search page
 */
export const Search = () => {
  // Get search term from url
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';
  const eraFilter = searchParams.get('e') ?? '';
  const tagFilters = searchParams.getAll('t');
  const artistFilter = searchParams.get('a') ?? '';

  // Hydration problems can occur when the client renders data before server-side rendering can finish.
  // If this happens, make the client-side rendering dependent on isMounted being true.
  // In this case, we need it for displaying the search term itself.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    console.log('search page mounted');
  }, []);

  /**
   * Function that loads results for a CompShelf.
   * To be passed as a prop. CompShelf provides `collection` and `lastId` parameters itself.
   * @type {(function(*): void)|*}
   */
  const loadResults = useMeteorLoader(
    'getSearchResults',
    {
      searchTerm: searchableName(searchTerm),
      era: eraFilter,
      tags: tagFilters,
      artistId: artistFilter
    },
    [searchTerm, eraFilter, tagFilters, artistFilter]
  );

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
            onLoadMore={loadResults}
            collection={COMPS}
            skipBackEnabled={true}
            loadMoreEnabled={true}
          />
          {/*Edits Shelf */}
          <h1 className="text-xl font-bold mb-2">
            Edits matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf
            onLoadMore={loadResults}
            collection={EDITS}
            skipBackEnabled={true}
            loadMoreEnabled={true}
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
                onLoadMore={loadResults}
                collection={YEDITORS}
                skipBackEnabled={true}
                loadMoreEnabled={true}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
