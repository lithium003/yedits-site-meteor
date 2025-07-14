import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { CompRoutes } from './pages/Comp';
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';
import { SearchRoutes } from './pages/Search';
import { YeditorRoutes } from './pages/Yeditor';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    path: '/',
    element: (
      <AudioPlayerProvider tracks={[]}>
        <App />
      </AudioPlayerProvider>
    ),
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HomeRoutes,
      ...SampleRoutes,
      ...CompRoutes,
      ...YeditorRoutes,
      ...SearchRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
