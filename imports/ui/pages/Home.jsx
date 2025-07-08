import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';

import { CompShelf } from '../components/CompShelf';
import { Meteor } from 'meteor/meteor';

export const Home = () => {
  // Create a function to pass to the Top 5 Comps shelf to give itself data
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
          <CompShelf onLoadMore={createLoadMoreFunc} />
        </div>
      </div>
    </>
  );
};
