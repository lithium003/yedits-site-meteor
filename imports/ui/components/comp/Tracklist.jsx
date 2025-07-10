import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Track } from './Track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl } from '@fortawesome/free-solid-svg-icons';

export const Tracklist = ({ comp, highlightEditId }) => {
  const { length } = comp;
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
      <div className="flex flex-col items-center mb-4 rounded-xl px-4 py-2 border-1 border-purple-600 ">
        <div className="flex w-full justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <span className="w-8 text-2xl text-purple-500 text-center">
              <FontAwesomeIcon icon={faListOl} />
            </span>
            <span className="pl-4 text-2xl font-bold">Tracklist</span>
          </div>

          <span>
            {edits.length} Tracks &middot; {length} &middot; 320kbps{' '}
          </span>
        </div>
        <div className="flex flex-col border-t-1 border-purple-600 w-full">
          {edits.map(edit => (
            <Track
              key={edit.id}
              edit={edit}
              highlight={edit.id === highlightEditId}
            />
          ))}
        </div>
      </div>
    </>
  );
};
