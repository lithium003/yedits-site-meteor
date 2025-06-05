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
            art_path:
              '/music/phIrTLTu5s5UnL3WqQdW/I5hcOLF6HaAwlOnNKH88/yen.jpg.webp',
            artist: 'nl4AjnR2vjmPNHRFziPP',
            comp: 'I5hcOLF6HaAwlOnNKH88',
            era: 'YEBU',
            filepath:
              '/music/phIrTLTu5s5UnL3WqQdW/I5hcOLF6HaAwlOnNKH88/03_BOBBY_DIGITAL.mp3',
            length: '2:22',
            name: 'BOBBY DIGITAL',
            name_reverse_search: 'latigidybbob',
            name_search: 'bobbydigital',
            number: '3',
            rating: 7,
            release_date: new Date('2025-03-07T00:00:00.000Z'),
            tags: ['Rework'],
            yeditor: 'phIrTLTu5s5UnL3WqQdW',
            yeditor_name: 'Akimbo'
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
