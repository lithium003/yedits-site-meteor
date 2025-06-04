import React from 'react';

// Element JSX UI
import { App } from '/imports/ui/App';

// Nested/Children Routes
import { HomeRoutes } from '/imports/routes/pages/Home';
import { SampleRoutes } from '/imports/routes/pages/Sample';
import { NotFoundRoutes } from '/imports/routes/pages/NotFound';
import { CompRoutes } from './pages/Comp';
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';

// Define Routes for App JSX layout
export const AppRoutes = [
  {
    path: '/',
    element: (
      <AudioPlayerProvider
        tracks={[
          {
            title: 'DEAD',
            src: '/music/phIrTLTu5s5UnL3WqQdW/U82L7c84vyb6qoE0elFy/9._DEAD.mp3',
            author: 'Akimbo',
            thumbnail:
              '/music/phIrTLTu5s5UnL3WqQdW/U82L7c84vyb6qoE0elFy/Vultures_2.png'
          }
        ]}
      >
        <App />
      </AudioPlayerProvider>
    ),
    children: [
      // Extends children array with nested routes via spread operator (...)
      ...HomeRoutes,
      ...SampleRoutes,
      ...CompRoutes,
      ...NotFoundRoutes // * Last for Page not found
    ]
  }
];
