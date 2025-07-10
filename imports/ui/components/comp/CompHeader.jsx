import React, { useState } from 'react';
import { PillCheckbox } from '../search/PillCheckbox';
import { getDateFromTimestamp } from '/imports/utils/firestoreHandling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

export const CompHeader = ({ comp }) => {
  const [description, setDescription] = useState('a');

  return (
    <>
      <section className="text-center mb-8 w-full ">
        <div className="flex items-start justify-center gap-12 border-4 border-purple-600 rounded-4xl px-8 py-6">
          {/* Comp Art */}
          <div className="mt-4 w-64 h-64 rounded-xl overflow-hidden">
            <img
              src={comp.art_path}
              alt={comp.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Comp Info */}
          <div className="flex-1 items-start text-left ">
            <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              {comp.name}
            </h1>
            <p className="text-3xl font-bold text-indigo-300 mb-2">
              {comp.yeditor_name || 'Unknown Yeditor'}
            </p>
            <p className="text-xl text-gray-300 mb-2 max-w-2xl">
              {comp.desc || 'No description provided.'}
            </p>
            <div className="mb-2">
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
            <div className="mb-2">
              <PillCheckbox
                label={
                  <span className="text-sm">
                    <FontAwesomeIcon icon={faPlay} />
                    Play All
                  </span>
                }
                onClick={() => {
                  setDescription('An amazing comp with a lot of great edits');
                }}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
              <PillCheckbox
                label="Download"
                onClick={() => {
                  setDescription(
                    'Community comp envisioning what GAJ would sound like if it were a B-side to MBDTF and as release ready as possible while still being creative'
                  );
                }}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
              <PillCheckbox
                label="Share"
                onClick={() => {
                  setDescription(
                    'LP6 comp containing various reworks and recreations of songs based on established and newly surfaced material from the era along with samples from the movie American Psycho inspired by BSB Dantes BAP comp.	'
                  );
                }}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
