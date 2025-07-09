import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { CompHeader } from '../components/comp/CompHeader';
import { Tracklist } from '../components/comp/Tracklist';

export const Comp = () => {
  const { compId } = useParams();
  const [comp, setComp] = useState(null);

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

  if (!comp) {
    return <h1 className="text-red-500">Comp not found</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{comp.name} - Yedits</title>
      </Helmet>
      <div className="min-h-screen text-white ">
        <div className="max-w-6xl mx-auto px-8 py-8 bg-purple-800">
          <CompHeader comp={comp} />
          <Tracklist comp={comp} highlightEditId={highlightEditId} />
        </div>
      </div>
    </>
  );
};
