import React from 'react';
import { StatCard } from './StatCard';
import {
  faCompactDisc,
  faWrench,
  faUsers,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export const YeditorStats = ({ allComps, allEdits }) => (
  <div className="grid grid-cols-4 gap-6 mb-12">
    <StatCard value={allComps.length} label="Comps" icon={faCompactDisc} />
    <StatCard value={allEdits.length} label="Edits" icon={faWrench} />
    <StatCard value={6} label="Collabs" icon={faUsers} />
    <StatCard value="4.3★" label="Avg Rating" icon={faStar} />
  </div>
);
