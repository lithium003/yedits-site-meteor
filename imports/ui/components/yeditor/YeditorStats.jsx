import React from 'react';
import { StatCard } from './StatCard';
import {
  faCompactDisc,
  faStar,
  faUsers,
  faWrench
} from '@fortawesome/free-solid-svg-icons';

export const YeditorStats = () => (
  <div className="grid grid-cols-4 gap-6 mb-12">
    <StatCard value={9} label="Comps" icon={faCompactDisc} />
    <StatCard value={99} label="Edits" icon={faWrench} />
    <StatCard value={6} label="Collabs" icon={faUsers} />
    <StatCard value="4.3★" label="Avg Rating" icon={faStar} />
  </div>
);
