import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { Fallback } from '/imports/ui/components/Fallback';
import { CompShelf } from '../components/CompShelf';

export const Home = () => (
  <>
    <Helmet>
      <title>Yedits - Home</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Welcome to Yedits.net!</h1>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        <CompShelf />
      </Suspense>
      <Suspense fallback={<Fallback />}></Suspense>
    </div>
  </>
);
