import React from 'react';

// Element JSX Component/Layout
import { Home } from '/imports/ui/pages/Home';

// Define Routes for Sample JSX component
export const HomeRoutes = [
  { path: '', element: <Home /> } // "" Will make it the default one to be displayed at / where no children displays nothing in <Outlet /> at Home UI JSX
];
