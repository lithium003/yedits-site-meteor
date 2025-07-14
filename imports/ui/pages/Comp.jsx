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

  // Highlighted Edit
  const [searchParams] = useSearchParams();
  const highlightEditId = searchParams.get('h') ?? '';

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
