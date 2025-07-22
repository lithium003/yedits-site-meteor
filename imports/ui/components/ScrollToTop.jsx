import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find your main scrollable container
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
