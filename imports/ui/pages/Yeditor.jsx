import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { YeditorItem } from '../components/YeditorItem';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  const [yeditor, setYeditor] = useState(null);

  useEffect(() => {
    Meteor.call('getYeditor', yeditorId, (err, res) => {
      if (err) {
        console.error('Error fetching yeditor:', err);
      } else {
        setYeditor(res);
      }
    });
  }, [yeditorId]);
  if (!yeditor) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <span>{yeditorId}</span>
      <span>{yeditor.display_name}</span>
      <YeditorItem data={yeditor} />
    </>
  );
};
