import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';
import { searchableName } from '/imports/utils/stringUtils';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';

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

  // Create a function that captures current search context
  const createLoadMoreFunc = useCallback(
    (collection, lastId, onSuccess, onError) => {
      Meteor.call(
        'getSearchResults',
        {
          collection,
          searchTerm: searchableName(searchTerm),
          era: eraFilter,
          tags: tagFilters,
          artistId: artistFilter,
          lastId
        },
        (err, result) => {
          if (err) onError(err);
          else onSuccess(result);
        }
      );
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
          <CompShelf onLoadMore={createLoadMoreFunc} collection={COMPS} />
          {/*Edits Shelf */}
          <h1 className="text-xl font-bold mb-2">
            Edits matching {isMounted ? `"${searchTerm}"` : ''}
          </h1>
          <CompShelf onLoadMore={createLoadMoreFunc} collection={EDITS} />
          {/*/!* Yeditors Shelf *!/*/}
          {/*/!* (don't display if searching for an era, as yeditors don't have eras) *!/*/}
          {/*/!* TODO could somehow change the getSearchResults Meteor method (or its calling logic) to only look for yeditors if yeditorsShelfRef exists.*/}
          {/* TODO this would be more maintainable than manually checking for eraFilter in the Method *!/*/}
          {/*{!eraFilter && (*/}
          {/*  <>*/}
          {/*    <h1 className="text-xl font-bold mb-2">*/}
          {/*      Yeditors matching {isMounted ? `"${searchTerm}"` : ''}*/}
          {/*    </h1>*/}
          {/*    <CompShelf*/}
          {/*      ItemComponent={YeditorItem}*/}
          {/*      items={yeditors}*/}
          {/*      loadMoreFunc={loadMoreSearchResults}*/}
          {/*      obj={yeditorsObj}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
};
