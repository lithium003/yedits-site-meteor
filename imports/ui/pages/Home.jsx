import React from 'react';
import { Helmet } from 'react-helmet';

import { useMeteorLoader } from '../../hooks/useMeteorLoader';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';
import { CompShelf } from '../components/CompShelf';

export const Home = () => {
  // Create a function to pass to the Top 5 Comps shelf to give itself data
  const loadTopWorks = useMeteorLoader('getTopWorks', {}, []);

  return (
    <>
      <Helmet>
        <title>Yedits - Home</title>
      </Helmet>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-3xl font-bold mt-2">Welcome to Yedits.net!</h1>
          <CompShelf onLoadMore={loadTopWorks} collection={COMPS} />
          <CompShelf onLoadMore={loadTopWorks} collection={EDITS} />
        </div>
      </div>
    </>
  );
};
