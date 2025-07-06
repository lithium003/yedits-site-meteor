import React, { useRef, useState } from 'react';
import { CompItem } from './CompItem';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';

/**
 * A shelf displaying Items.
 * @param ItemComponent - the Item component to be displayed (default CompItem)
 * @param items - an array of objects containing item data, to be mapped onto individual Item components
 * @param onLoadNext - the function to be mapped to the 'next' button (optional)
 * @returns {JSX.Element}
 */
export const CompShelf = ({
  ItemComponent = CompItem,
  items = [],
  loadMoreFunc = null,
  obj,
  skipBackEnabled = true,
  loadMoreEnabled = true
}) => {
  const { collection, state = items, setState } = obj || {};
  // Calculate width: 200px (CompItem width) * 5 + 8px (gap) * 4 + 16px (padding) + 8px (scrollbar) + 16px (idk) + 8px (right padding)
  const shelfWidth = 200 * 5 + 8 * 4 + 16 + 8 + 16 + 8;
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
    if (!loadMoreFunc) {
      console.log('a');
      scrollToEnd(containerRef);
      return;
    }
    const lastId = state[state.length - 1]?.id;
    if (!lastId || isLoading) return;

    setIsLoading(true);

    // Call the meteor function directly
    loadMoreFunc(
      collection,
      lastId,
      result => {
        // Success handler
        setState(prev => {
          const newData = [...prev, ...result];
          // Scroll to newly loaded items
          setTimeout(() => {
            scrollToEnd(containerRef);
            setIsLoading(false);
          }, 100); // Delay to ensure DOM is updated
          return newData;
        });
      },
      error => {
        // Error handler
        console.error('Failed to fetch next results:', error);
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
          className="
            overflow-x-scroll
            h-[284px] px-2 pb-4
            flex flex-nowrap
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-black
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
            "
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

        {/* Load Next button  TODO make these conditional on some flag */}
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
