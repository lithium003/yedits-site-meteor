import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StatCard = ({ value, label, icon }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 relative">
    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
      {value}
    </div>
    <div className="text-sm text-gray-400 uppercase tracking-wide">{label}</div>
    <div className="absolute top-4 right-4 text-3xl opacity-20">
      <FontAwesomeIcon icon={icon} />
    </div>
  </div>
);
