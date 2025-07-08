import React, { Suspense, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';
import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';

export const Home = () => {
  const [topComps, setTopComps] = useState([
    {
      id: 'MISSING ID',
      name: 'MISSING NAME',
      yeditor: 'MISSING YEDITOR ID',
      yeditor_name: 'MISSING YEDITOR NAME',
      art_path: 'MISSING PATH'
    }
  ]);

  // Create a function that captures current search context
  const createLoadMoreFunc = useCallback(({ onSuccess, onError }) => {
    Meteor.call('getTop5Comps', {}, (err, result) => {
      if (err) onError(err);
      else onSuccess(result);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Yedits - Home</title>
      </Helmet>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-3xl font-bold mt-2">Welcome to Yedits.net!</h1>
          {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
          <Suspense fallback={<Fallback />}>
            <CompShelf items={topComps} onLoadMore={createLoadMoreFunc} />
          </Suspense>
          <Suspense fallback={<Fallback />}></Suspense>
        </div>
      </div>
    </>
  );
};
