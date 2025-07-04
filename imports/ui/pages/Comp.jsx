import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { CompInfo } from '../components/CompInfo';
import { Tracklist } from '../components/Tracklist';

export const Comp = () => {
  const { compId } = useParams();
  const [comp, setComp] = useState(null);
  const [loading, setLoading] = useState(true);

  // Highlighted Edit
  const [searchParams] = useSearchParams();
  const highlightEditId = searchParams.get('h') ?? '';

  useEffect(() => {
    const getCompData = async () => {
      try {
        const res = await Meteor.callAsync('getComp', compId);
        setComp(res);
      } catch (err) {
        console.error('Error fetching comp:', err);
      } finally {
        setLoading(false);
      }
    };

    getCompData(); // TODO what's going on here
  }, [compId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
