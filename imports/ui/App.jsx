import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { NavBar } from '/imports/ui/components/NavBar';
import { Fallback } from '/imports/ui/components/Fallback';
import { AudioPlayer } from './components/player/AudioPlayer';

export const App = () => (
  <>
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pb-32">
        {/* Add padding-bottom to match footer height */}
        {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
        <Suspense fallback={<Fallback />}>
          <Outlet /> {/* Renders the matched child (pages) route here */}
        </Suspense>
      </main>
    </div>
    <div className="fixed bottom-0 left-0 right-0 w-full z-10">
      <AudioPlayer />
    </div>
  </>
);
