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
  const [compsDiscog, setCompsDiscog] = useState([]);
  const [editsDiscog, setEditsDiscog] = useState([]);
  const [activeTab, setActiveTab] = useState('comps');

  const fetchData = (
    collection,
    numResults,
    orderField,
    orderDirection,
    callback,
    lastId = null
  ) => {
    Meteor.call(
      'getYeditorWorks',
      {
        collection: collection,
        numResults: 5,
        yeditorId: yeditorId,
        orderField: orderField,
        orderDirection: orderDirection,
        lastId: lastId
      },
      (err, res) => {
        if (err) {
          console.error(`Error fetching ${collection}:`, err);
        } else {
          callback(res);
        }
      }
    );
  };

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

    // Get top 5 for featured sections
    fetchData(COMPS, 5, 'rating', 'desc', setCompsTop);
    fetchData(EDITS, 5, 'rating', 'desc', setEditsTop);

    // Get all items for complete discography section
    fetchData(COMPS, 5, 'release_date', 'desc', setCompsDiscog);
    fetchData(EDITS, 5, 'release_date', 'desc', setEditsDiscog);
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

          <YeditorStats allComps={compsDiscog} allEdits={editsDiscog} />

          <FeaturedSection title="Top Comps" icon={faStar} items={compsTop} />

          <FeaturedSection title="Top Edits" icon={faFire} items={editsTop} />

          <DiscographySection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            allComps={compsDiscog}
            allEdits={editsDiscog}
          />

          <ConnectSection />
        </div>
      </div>
    </div>
  );
};
