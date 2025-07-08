import React, { useEffect, useRef, useState } from 'react';
import { CompItem } from './CompItem';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { YEDITORS } from '../../api/collections/AvailableCollections';
import { YeditorItem } from './YeditorItem';

/**
 *
 * A shelf displaying Items.

 * @param onLoadMore - the function to be mapped to the 'next' button (optional)
 * @param collection - the collection to draw data from
 * @param defaultWidth - number of items wide the shelf should be by default (any more requires scrolling) (optional)
 * @param centerItems - true if you want to center the items, false if you want them aligned to the start of the container
 * @param skipBackEnabled - true if you want a button for going to the start of the container, false otherwise
 * @param loadMoreEnabled - true if you want a button to load more and go to the end of the container, false otherwise
 * @returns {JSX.Element}
 * @constructor
 */
export const CompShelf = ({
  onLoadMore,
  collection,
  defaultWidth = 5,
  centerItems = false,
  skipBackEnabled = true,
  loadMoreEnabled = true
}) => {
  // Store the data for items to display in an array
  const [items, setItems] = useState([]);

  // Vary the type of thing displayed (CompItem, YeditorItem) based on the collection
  let ItemComponent;
  if (collection === YEDITORS) {
    ItemComponent = YeditorItem;
  } else {
    ItemComponent = CompItem;
  }

  // Load initial data when onLoadMore function changes
  useEffect(() => {
    setItems([]); // Clear existing items
    setIsLoading(true);

    onLoadMore(
      collection,
      null, // No lastId for initial load
      result => {
        setItems(result);
        setIsLoading(false);
      },
      error => {
        console.error('Failed to load initial data:', error);
        setIsLoading(false);
      }
    );
  }, [onLoadMore, collection]);

  // Calculate width: 200px (CompItem width) * 5 + 8px (gap) * 4 + 16px (padding) + 8px (scrollbar) + 16px (idk) + 8px (right padding)
  const shelfWidth = 200 * defaultWidth + 8 * 4 + 16 + 8 + 16 + 8;
  // Get the ref of the scrollable container inside, for use in scrolling to start/end
  const containerRef = useRef(null);
  // Keep track of when new items are loading
  const [isLoading, setIsLoading] = useState(false);
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
    if (isLoading || items.length === 0) return;

    setIsLoading(true);
    const lastId = items[items.length - 1]?.id;

    onLoadMore(
      collection,
      lastId,
      result => {
        setItems(prev => [...prev, ...result]);
        setIsLoading(false);
        // Scroll to newly loaded items
        setTimeout(() => {
          scrollToEnd(containerRef);
          setIsLoading(false);
        }, 100); // Delay to ensure DOM is updated
      },
      error => {
        console.error('Failed to load more:', error);
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <div className="min-h-[284px] flex flex-nowrap w-fit gap-2 py-3 px-2 bg-black/50 rounded-xl">
        {/* Scroll to Start button TODO turn these into components and pass the function/icon*/}
        {skipBackEnabled && (
          <div className="shelf-item flex-shrink-0 flex items-center">
            <button
              onClick={scrollToStart}
              className="h-[120px] w-[16px] bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white/75 transition-colors"
            >
              <RiArrowLeftDoubleLine />
            </button>
          </div>
        )}

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
          {items.map(item => (
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
          <div className="shelf-item flex-shrink-0 flex items-center">
            <button
              onClick={loadNext}
              className="h-[120px] w-[16px] bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white/75 transition-colors"
            >
              <RiArrowRightDoubleLine />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
