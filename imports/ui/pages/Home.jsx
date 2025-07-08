import React from 'react';
import { Helmet } from 'react-helmet';

import { CompShelf } from '../components/CompShelf';
import { useMeteorLoader } from '../../hooks/useMeteorLoader';

export const Home = () => {
  // Create a function to pass to the Top 5 Comps shelf to give itself data
  const loadTop5Comps = useMeteorLoader('getTop5Comps', {}, []);

  return (
    <>
      <Helmet>
        <title>Yedits - Home</title>
      </Helmet>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-3xl font-bold mt-2">Welcome to Yedits.net!</h1>
          <CompShelf onLoadMore={loadTop5Comps} />
        </div>
      </div>
    </>
  );
};
