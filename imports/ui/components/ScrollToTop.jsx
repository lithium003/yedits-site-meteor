import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Custom component that scrolls to the top when navigating to a new route.
 * Without this, going to a new route keeps the current scroll position.
 * This can be awkward as you can be sent straight to the bottom of a comp/yeditor page.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      const main = document.querySelector('main');
      if (main) {
        main.scrollTo(0, 0);
      }
    }
    // For POP (back/forward), let ScrollRestoration handle it
  }, [pathname, navigationType]);

  return null;
};
