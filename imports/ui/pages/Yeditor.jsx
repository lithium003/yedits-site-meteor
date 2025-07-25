import { faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';

import { useMeteorLoader } from '../../hooks/useMeteorLoader';
import { CompShelf } from '../components/display/CompShelf';
import { FeaturedSection } from '../components/layout/FeaturedSection';
import { ConnectSection } from '../components/yeditor/ConnectSection';
import { DiscographySection } from '../components/yeditor/DiscographySection';
import { YeditorHeader } from '../components/yeditor/YeditorHeader';
import { YeditorStats } from '../components/yeditor/YeditorStats';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  const [yeditor, setYeditor] = useState(null);
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

  /**
   * Function that loads results for a CompShelf.
   * To be passed as a prop. CompShelf provides `collection` and `lastId` parameters itself.
   * @type {(function(*): void)|*}
   */
  const loadTop = useMeteorLoader(
    'getYeditorWorks',
    {
      numResults: 5,
      yeditorId: yeditorId,
      orderField: 'rating',
      orderDirection: 'desc'
    },
    [yeditorId]
  );

  /**
   * Function that loads results for a CompShelf.
   * To be passed as a prop. CompShelf provides `collection` and `lastId` parameters itself.
   * @type {(function(*): void)|*}
   */
  const loadDiscog = useCallback(
    ({ collection, lastId, onSuccess, onError }) => {
      Meteor.call(
        'getYeditorWorks',
        {
          collection: collection,
          numResults: 5,
          yeditorId: yeditorId,
          orderField: 'release_date',
          orderDirection: 'desc',
          lastId: lastId
        },
        (err, result) => {
          if (err) onError(err);
          else onSuccess(result);
        }
      );
    },
    [yeditorId]
  );

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

          <YeditorStats />

          <FeaturedSection title="Top Comps" icon={faStar}>
            <CompShelf onLoadMore={loadTop} collection={COMPS} />
          </FeaturedSection>
          <FeaturedSection title="Top Edits" icon={faFire}>
            <CompShelf onLoadMore={loadTop} collection={EDITS} />
          </FeaturedSection>

          <DiscographySection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLoadMore={loadDiscog}
          />

          <ConnectSection />
        </div>
      </div>
    </div>
  );
};
