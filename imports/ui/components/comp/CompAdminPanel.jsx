import { Meteor } from 'meteor/meteor';
import React from 'react';

export const CompAdminPanel = ({ comp }) => {
  // Convert Tracknums
  const covertTracknums = () => {
    Meteor.call('convertTracknums', comp.id, (err, res) => {
      if (err) {
        console.error('Error converting tracknums:', err);
      } else {
        console.log('Tracknums converted successfully:', res);
      }
    });
  };

  const addCompArtistNameField = () => {
    Meteor.call('addCompArtistNameField', (err, res) => {
      if (err) {
        console.error('Error adding artist name field:', err);
      } else {
        console.log('Artist name field added successfully:', res);
      }
    });
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        <span
          className="hover:bg-amber-300 hover:cursor-pointer"
          onClick={covertTracknums}
        >
          Convert Tracknums
        </span>
        <span
          className="hover:bg-amber-400 hover:cursor-pointer"
          onClick={addCompArtistNameField}
        >
          Add Artist Name
        </span>
      </div>
    </>
  );
};
