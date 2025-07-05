import React, { Suspense, useEffect, useState } from 'react';
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

  useEffect(() => {
    // On first component render
    Meteor.call('getTop5Comps', (err, result) => {
      if (err) {
        console.error('Failed to fetch comps:', err);
      } else {
        setTopComps(Array.from(result));
      }
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
            <CompShelf items={topComps} />
          </Suspense>
          <Suspense fallback={<Fallback />}></Suspense>
        </div>
      </div>
    </>
  );
};
