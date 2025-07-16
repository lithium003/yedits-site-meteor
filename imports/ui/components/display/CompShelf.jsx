import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { YEDITORS } from '../../../api/collections/AvailableCollections';
import { CompItemSkeleton } from '../skeletons/CompItemSkeleton';
import { CompItem } from './CompItem';
import { ShelfButton } from './ShelfButton';
import { YeditorItem } from './YeditorItem';

export const CompShelf = ({
  onLoadMore,
  collection,
  defaultWidth = 5,
  centerItems = false,
  skipBackEnabled = false,
  loadMoreEnabled = false
}) => {
  // Keep track of initial load
  const [loading, setLoading] = useState(true);
  // Keep track of when new items are loading.
  // Needs to be separate from initial load to avoid turning CompShelves
  // back into skeletons when loading more items and breaking the scroll position.
  const [loadingMore, setLoadingMore] = useState(false);

  // Store the data for items to display in an array
  const [items, setItems] = useState([]);

  // Vary the type of thing displayed (CompItem, YeditorItem) based on the collection
  /** @type {React.ComponentType<{ data: any }>} */
  let ItemComponent;
  if (collection === YEDITORS) {
    ItemComponent = YeditorItem;
  } else {
    ItemComponent = CompItem;
  }

  // Load initial data when onLoadMore function changes
  useEffect(() => {
    setItems([]); // Clear existing items
    setLoading(true);

    onLoadMore({
      collection: collection,
      lastId: null, // No lastId for initial load
      onSuccess: result => {
        setItems(result);
        setLoading(false);
        console.log('Initial shelf data loaded:', result);
      },
      onError: error => {
        console.error('Failed to load initial data:', error);
        setLoading(false);
      }
    });
  }, [onLoadMore, collection]);

  // Calculate width: 200px (CompItem width) * 5 + 8px (gap) * 4 + 16px (padding) + 8px (scrollbar) + 16px (idk) + 8px (right padding)
  const shelfWidth = 200 * defaultWidth + 8 * 4 + 16 + 8 + 16 + 8;
  // Get the ref of the scrollable container inside, for use in scrolling to start/end
  const containerRef = useRef(null);

  /**
   * Scroll to start of CompShelf
   */
  const scrollToStart = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll to end to show all new items
   */
  const scrollToEnd = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: 'smooth'
    });
  };

  /**
   * Loads the next few comps and scrolls to show them
   */
  const loadNext = () => {
    if (items.length === 0) return;

    setLoadingMore(true);
    const lastId = items[items.length - 1]?.id;

    onLoadMore({
      collection: collection,
      lastId: lastId,
      onSuccess: result => {
        setItems(prev => [...prev, ...result]);
        setLoadingMore(false);
        // Scroll to newly loaded items
        setTimeout(() => {
          scrollToEnd();
          setLoadingMore(false);
        }, 100); // Delay to ensure DOM is updated
      },
      onError: error => {
        console.error('Failed to load more:', error);
        setLoadingMore(false);
      }
    });
  };

  return (
    <>
      <div className="min-h-[284px] flex flex-nowrap w-fit gap-2 py-3 px-2 bg-black/50 rounded-xl">
        {/* Scroll to Start button TODO turn these into components and pass the function/icon*/}
        {skipBackEnabled && (
          <ShelfButton onClick={scrollToStart} loadingMore={false}>
            <RiArrowLeftDoubleLine />
          </ShelfButton>
        )}
        {/* Scrollable container for items */}
        <div
          ref={containerRef}
          style={{ width: `${shelfWidth}px` }}
          // Change overflow-x-scroll to overflow-x-auto to remove the default black scrollbar placeholder.
          // `pb-4` and `h-[284px]` create placeholder spacing for the scrollbar.
          className={`
            overflow-x-scroll
            h-[284px] px-2 pb-4
            flex flex-nowrap
            ${centerItems ? 'justify-center-safe' : ''}
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-black
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
            `}
        >
          {loading
            ? // Show multiple skeletons while initally loading
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="shelf-item flex-shrink-0 first:ml-0 last:mr-0 ml-2 mr-2"
                    key={`skeleton-${index}`}
                  >
                    <CompItemSkeleton />
                  </div>
                ))
            : items.map(item => (
                <div
                  className="shelf-item flex-shrink-0 first:ml-0 last:mr-0 ml-2 mr-2"
                  key={item.id}
                >
                  <ItemComponent data={item} />
                </div>
              ))}
        </div>

        {/* Load Next button */}
        {loadMoreEnabled && (
          <ShelfButton onClick={loadNext} loadingMore={loadingMore}>
            <RiArrowRightDoubleLine />
          </ShelfButton>
        )}
      </div>
    </>
  );
};
