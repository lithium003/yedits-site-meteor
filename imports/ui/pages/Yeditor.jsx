import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { YeditorPhoto } from '../components/yeditor/YeditorPhoto';
import { Helmet } from 'react-helmet';
import { CompShelf } from '../components/CompShelf';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  const [yeditor, setYeditor] = useState(null);
  const [compsTop, setCompsTop] = useState([]);

  useEffect(() => {
    Meteor.call('getYeditor', yeditorId, (err, res) => {
      if (err) {
        console.error('Error fetching yeditor:', err);
      } else {
        setYeditor(res);
      }
    });
  }, [yeditorId]);

  useEffect(() => {
    console.log('yeditorId: ', yeditorId);
    Meteor.call(
      'getYeditorTop',
      { collection: COMPS, numResults: 2, yeditorId: yeditorId },
      (err, res) => {
        if (err) {
          console.error('Error fetching top data:', err);
        } else {
          setCompsTop(res);
        }
      }
    );
  }, [yeditorId]);

  if (!yeditor) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Helmet>
        <title>{yeditor.display_name} - Yedits</title>
      </Helmet>
      {/* Horizontally centers the page */}
      <div className="flex justify-center w-full">
        <div>
          {/* Title */}
          <div className="flex gap-4 mb-2 bg-green-400 items-center">
            <YeditorPhoto yeditor={yeditor} size="200" />
            <div
              id="text-container"
              className="flex flex-col gap-4 bg-blue-400"
            >
              <h1
                onClick={() => console.log(compsTop)}
                className="text-7xl font-bold text-purple-500 bg-pink-400"
              >
                {yeditor.display_name}
              </h1>
              <span className="bg-green-800">ABCDE</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 justify-between bg-green-400">
            <span className="bg-yellow-500">5 Comps</span>
            <span className="bg-yellow-500">3 Edits</span>
            <span className="bg-yellow-500">0 Collabs</span>
            <span className="bg-yellow-500">4.3x Rating</span>
          </div>

          {/* Top Comps */}
          {/*<div>*/}
          {/*  <CompShelf items={compsTop}*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};
