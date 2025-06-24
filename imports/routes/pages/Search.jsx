import React from 'react';

// Element JSX Searchonent/Layout
import { Search } from '/imports/ui/pages/Search';

// Define Routes for Sample JSX Searchonent
export const SearchRoutes = [
  { path: '/search/:searchTerm?', element: <Search /> }
];
