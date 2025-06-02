import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Track } from './Track';

export const Tracklist = ({ comp }) => {
  const { name, yeditor, yeditor_name, art_path, length } = comp;
  const [edits, setEdits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEditsData = async () => {
      try {
        const res = await Meteor.callAsync('getCompEdits', comp.id);
        setEdits(res);
      } catch (err) {
        console.error('Error fetching comp:', err);
      } finally {
        setLoading(false);
      }
    };

    getEditsData();
  }, [comp]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!edits) {
    return <h1 className="text-red-500">Comp not found</h1>;
  }

  return (
    <>
      <div
        className="flex flex-col space-y-2 overflow-y-auto h-96
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-black
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-500
        [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
      "
      >
        {edits.map(edit => (
          <Track key={edit.id} edit={edit} />
        ))}
      </div>

      <span>
        {edits.length} Tracks &middot; {length} &middot; 320kbps{' '}
      </span>
    </>
  );
};
