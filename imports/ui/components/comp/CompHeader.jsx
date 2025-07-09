import React from 'react';
import { PillCheckbox } from '../search/PillCheckbox';
import { getDateFromTimestamp } from '/imports/utils/firestoreHandling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const CompHeader = ({ comp }) => (
  <section className="text-center mb-8 w-full ">
    <div className="flex items-center justify-center gap-12 border-4 border-purple-600 rounded-4xl">
      <div className="relative">
        <div className="w-64 h-64 rounded-xl overflow-hidden">
          <img
            src={comp.art_path}
            alt={comp.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 self-start text-left ">
        <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
          {comp.name}
        </h1>
        <p className="text-3xl font-bold text-indigo-300 mb-2">
          {comp.yeditor_name || 'Unknown Yeditor'}
        </p>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl">
          {comp.description || 'A collection of amazing edits and comps'}
        </p>
        <div>
          <PillCheckbox
            label={comp.era || 'Unknown Era'}
            type="tag"
            activeColor="bg-blue-500"
            inactiveColor="bg-gray-300"
            textColor="text-white"
            className="px-0.5"
          />
          <PillCheckbox
            label={comp.artist || 'Unknown Artist'}
            type="tag"
            activeColor="bg-blue-500"
            inactiveColor="bg-gray-300"
            textColor="text-white"
            className="px-0.5"
          />
          <PillCheckbox
            label={
              getDateFromTimestamp(comp.release_date)
                .getFullYear()
                .toString() || 'Unknown Artist'
            }
            type="tag"
            activeColor="bg-blue-500"
            inactiveColor="bg-gray-300"
            textColor="text-white"
            className="px-0.5"
          />
          <PillCheckbox
            label={
              <span className="text-sm">
                <FontAwesomeIcon icon={faStar} />
                {comp.rating}
              </span>
            }
            type="tag"
            activeColor="bg-blue-500"
            inactiveColor="bg-gray-300"
            textColor="text-white"
            className="px-0.5"
          />
        </div>
      </div>
    </div>
  </section>
);
