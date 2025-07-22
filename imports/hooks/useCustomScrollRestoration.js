import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Custom hook that restores scroll position when navigating with back/forward buttons.
 * Without this, navigating back/forward keeps the current scroll position.
 */
export const useCustomScrollRestoration = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef({});

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    // Save scroll position before navigating away
    return () => {
      scrollPositions.current[pathname] = main.scrollTop;
    };
  }, [pathname]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    if (
      navigationType === 'POP' &&
      scrollPositions.current[pathname] !== undefined
    ) {
      main.scrollTo(0, scrollPositions.current[pathname]);
    } else if (navigationType === 'PUSH') {
      main.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
};
