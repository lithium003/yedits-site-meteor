import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';

import { YeditorHeader } from '../components/yeditor/YeditorHeader';
import { YeditorStats } from '../components/yeditor/YeditorStats';
import { FeaturedSection } from '../components/yeditor/FeaturedSection';
import { DiscographySection } from '../components/yeditor/DiscographySection';
import { ConnectSection } from '../components/yeditor/ConnectSection';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  const [yeditor, setYeditor] = useState(null);
  const [compsTop, setCompsTop] = useState([]);
  const [editsTop, setEditsTop] = useState([]);
  const [allComps, setAllComps] = useState([]);
  const [allEdits, setAllEdits] = useState([]);
  const [activeTab, setActiveTab] = useState('comps');

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

    const fetchData = (collection, callback) => {
      Meteor.call(
        'getYeditorTop',
        { collection, numResults: 5, yeditorId },
        (err, res) => {
          if (err) {
            console.error(`Error fetching ${collection}:`, err);
          } else {
            callback(res);
          }
        }
      );
    };

    // Get top 5 for featured sections
    fetchData(COMPS, setCompsTop);
    fetchData(EDITS, setEditsTop);

    // Get all items for complete discography section
    fetchData(COMPS, setAllComps);
    fetchData(EDITS, setAllEdits);
  }, [yeditorId]);

  if (!yeditor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>{yeditor.display_name} - Yedits</title>
      </Helmet>

      <div className="min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <YeditorHeader yeditor={yeditor} />

          <YeditorStats allComps={allComps} allEdits={allEdits} />

          <FeaturedSection title="Top Comps" icon={faStar} items={compsTop} />

          <FeaturedSection title="Top Edits" icon={faFire} items={editsTop} />

          <DiscographySection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            allComps={allComps}
            allEdits={allEdits}
          />

          <ConnectSection />
        </div>
      </div>
    </div>
  );
};
