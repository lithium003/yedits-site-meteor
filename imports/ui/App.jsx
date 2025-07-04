import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// JSX UI
import { NavBar } from '/imports/ui/components/NavBar';
import { Fallback } from '/imports/ui/components/Fallback';
import { AudioPlayer } from './components/player/AudioPlayer';

export const App = () => (
  <>
    <div className="h-screen flex flex-col">
      <NavBar />
      <main
        className="flex-1 overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-black
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-500
        [&::-webkit-scrollbar-thumb:hover]:bg-gray-600"
      >
        {/* Suspense delays rendering until asynchronous data is ready (SSR) */}
        <Suspense fallback={<Fallback />}>
          <Outlet /> {/* Renders the matched child (pages) route here */}
        </Suspense>
      </main>
      <div className="w-full">
        <AudioPlayer />
      </div>
    </div>
  </>
);
