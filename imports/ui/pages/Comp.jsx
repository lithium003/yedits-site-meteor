import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { CompInfo } from '../components/CompInfo';
import { Tracklist } from '../components/Tracklist';
import { AudioPlayer } from '../components/player/AudioPlayer';

export const Comp = () => {
  const { comp_id } = useParams();
  const [comp, setComp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompData = async () => {
      try {
        const res = await Meteor.callAsync('getComp', comp_id);
        setComp(res);
      } catch (err) {
        console.error('Error fetching comp:', err);
      } finally {
        setLoading(false);
      }
    };

    getCompData();
  }, [comp_id]);

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
      <AudioPlayer />
      <CompInfo comp={comp} />
      <Tracklist comp={comp} />
    </>
  );
};
