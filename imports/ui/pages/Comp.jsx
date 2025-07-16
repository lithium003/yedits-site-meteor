import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { CompHeader } from '../components/comp/CompHeader';
import { Tracklist } from '../components/comp/Tracklist';

export const Comp = () => {
  const { compId } = useParams();
  const [comp, setComp] = useState(null);
  const [edits, setEdits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(true); // TODO eventually connect to account

  // Highlighted Edit
  const [searchParams] = useSearchParams();
  const highlightEditId = searchParams.get('h') ?? '';

  // Convert Tracknums
  const covertTracknums = () => {
    Meteor.call('convertTracknums', compId, (err, res) => {
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

  useEffect(() => {
    Meteor.call('getComp', compId, (err, res) => {
      if (err) {
        console.error('Error fetching comp:', err);
      } else {
        setComp(res);
      }
    });
  }, [compId]);

  // TODO why is it like this
  useEffect(() => {
    const getEditsData = async () => {
      try {
        const res = await Meteor.callAsync('getCompEdits', compId);
        setEdits(res);
      } catch (err) {
        console.error('Error fetching comp:', err);
      } finally {
        setLoading(false);
      }
    };

    getEditsData();
  }, [compId]);

  if (!comp) {
    return <h1 className="text-red-500">Comp not found</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{comp.name} - Yedits</title>
      </Helmet>
      <div className="min-h-screen text-white ">
        <div className="max-w-6xl mx-auto px-8 py-8 ">
          <CompHeader comp={comp} edits={edits} />
          {adminMode && (
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
          )}
          <Tracklist
            comp={comp}
            edits={edits}
            highlightEditId={highlightEditId}
          />
        </div>
      </div>
    </>
  );
};
