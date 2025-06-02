import React from 'react';

// Element JSX Component/Layout
import { Comp } from '/imports/ui/pages/Comp';

// Define Routes for Sample JSX component
export const CompRoutes = [
  { path: '/comp/:comp_id', element: <Comp /> } // "" Will make it the default one to be displayed at / where no children displays nothing in <Outlet /> at Comp UI JSX
];
