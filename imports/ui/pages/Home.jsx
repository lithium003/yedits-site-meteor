import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

// JSX UI
import { SampleView } from '/imports/ui/components/SampleView';
import { Fallback } from '/imports/ui/components/Fallback';
import { CompItem } from '../components/CompItem';

export const Home = () => (
  <>
    <Helmet>
      <title>SkillTree - Home</title>
    </Helmet>
    <div className="p-2">
      <h1 className="text-3xl font-bold mt-2">Welcome to SkillTree!</h1>
      {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
      <Suspense fallback={<Fallback />}>
        <CompItem />
        <CompItem />
        <CompItem />
        <CompItem />
      </Suspense>
      <Suspense fallback={<Fallback />}></Suspense>
    </div>
  </>
);
