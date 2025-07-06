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
  const [editsTop, setEditsTop] = useState([]);

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
      { collection: COMPS, numResults: 5, yeditorId: yeditorId },
      (err, res) => {
        if (err) {
          console.error('Error fetching top data:', err);
        } else {
          setCompsTop(res);
        }
      }
    );
    Meteor.call(
      'getYeditorTop',
      { collection: EDITS, numResults: 5, yeditorId: yeditorId },
      (err, res) => {
        if (err) {
          console.error('Error fetching top data:', err);
        } else {
          setEditsTop(res);
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
      <div id="yeditor-container" className="flex justify-center w-full">
        <div>
          {/* Title */}
          <div
            id="yeditor-hero"
            className="flex gap-12 mb-2 bg-green-400 items-center"
          >
            <YeditorPhoto id="yeditor-avatar" yeditor={yeditor} size="200" />
            <div id="yeditor-name" className="flex flex-col gap-4 bg-blue-400">
              <h1
                onClick={() => console.log(compsTop)}
                className="text-8xl font-bold text-purple-500 bg-pink-400"
              >
                {yeditor.display_name}
              </h1>
              <div id="social-links" className="bg-green-800">
                ABCDE
              </div>
            </div>
          </div>
          {/* Stats */}
          <div
            id="stats-grid"
            className="flex gap-4 justify-between bg-green-400"
          >
            <span id="stat-card-1" className="bg-yellow-500">
              5 Comps
            </span>
            <span id="stat-card-2" className="bg-yellow-500">
              3 Edits
            </span>
            <span id="stat-card-3" className="bg-yellow-500">
              0 Collabs
            </span>
            <span id="stat-card-4" className="bg-yellow-500">
              4.3x Rating
            </span>
          </div>
          {/* TODO refactor CompShelf to have all of its own < > loading logic inside it */}
          <div id="top-comps-section" className="flex justify-center">
            <div className="flex flex-col">
              <h2 id="top-comps-header">Top Comps</h2>
              <CompShelf
                id="top-comps-grid"
                items={compsTop}
                centerItems={true}
                skipBackEnabled={false}
                loadMoreEnabled={false}
              />
            </div>
          </div>
          <div id="top-edits-section" className="flex justify-center">
            <div className="flex flex-col">
              <h2 id="top-edits-header">Top Edits</h2>
              <CompShelf
                id="top-edits-grid"
                items={editsTop}
                centerItems={true}
                skipBackEnabled={false}
                loadMoreEnabled={false}
              />
            </div>
          </div>
          <div id="discography-section" className="flex justify-center">
            <div className="flex flex-col">
              <h2 id="disco-header">Complete Discography</h2>
              <CompShelf
                id="disco-grid"
                items={compsTop}
                centerItems={true}
                skipBackEnabled={false}
                loadMoreEnabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
