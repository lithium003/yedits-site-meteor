import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { CompInfo } from '../components/comp/CompInfo';
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
      <CompInfo comp={comp} />
      <Tracklist comp={comp} highlightEditId={highlightEditId} />
    </>
  );
};
