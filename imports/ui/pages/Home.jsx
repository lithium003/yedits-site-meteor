import React from 'react';
import { Helmet } from 'react-helmet';

import { COMPS, EDITS } from '../../api/collections/AvailableCollections';
import { useMeteorLoader } from '../../hooks/useMeteorLoader';
import { CompShelf } from '../components/CompShelf';
import { SectionHeader } from '../components/SectionHeader';

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
          <h1 className="text-6xl font-bold my-2 text-center ">
            Welcome to Yedits.net!
          </h1>
          <SectionHeader title="Top Comps" />
          <CompShelf onLoadMore={loadTopWorks} collection={COMPS} />
          <SectionHeader title="Top Edits" />
          <CompShelf onLoadMore={loadTopWorks} collection={EDITS} />
        </div>
      </div>
    </>
  );
};
