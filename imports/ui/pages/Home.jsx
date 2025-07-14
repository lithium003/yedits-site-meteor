import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  faFire,
  faNewspaper,
  faPlus,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';
import { useMeteorLoader } from '../../hooks/useMeteorLoader';
import { CompShelf } from '../components/CompShelf';
import { FeaturedSection } from '../components/FeaturedSection';

export const Home = () => {
  // Get the current spotlighted Yeditor
  const [spotlightedYeditor, setSpotlightedYeditor] = useState(null);

  // TODO this is so slow
  useEffect(() => {
    Meteor.call('getSpotlightedYeditor', (err, res) => {
      if (err) {
        console.error('Error fetching yeditor:', err);
      } else {
        setSpotlightedYeditor(res);
      }
    });
  }, []);

  const loadTopWorks = useMeteorLoader('getTopWorks', {}, []);
  const loadNewReleases = useMeteorLoader('getNewReleases', {}, []);
  const loadRecentlyAdded = useMeteorLoader('getRecentlyAdded', {}, []);
  const loadYeditorSpotlight = useMeteorLoader(
    'getYeditorWorks',
    {
      numResults: 5,
      yeditorId: spotlightedYeditor?.id || '',
      orderField: 'rating',
      orderDirection: 'desc'
    },
    [spotlightedYeditor]
  );
  return (
    <>
      <Helmet>
        <title>Yedits - Home</title>
      </Helmet>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-6xl font-bold my-2 text-center ">
            Welcome to Yedits.net!
          </h1>

          <FeaturedSection title="New Releases" icon={faNewspaper}>
            <CompShelf onLoadMore={loadNewReleases} collection={COMPS} />
          </FeaturedSection>

          <FeaturedSection title="Recently Added" icon={faPlus}>
            <CompShelf onLoadMore={loadRecentlyAdded} collection={COMPS} />
          </FeaturedSection>

          <FeaturedSection title="Top Comps" icon={faStar}>
            <CompShelf onLoadMore={loadTopWorks} collection={COMPS} />
          </FeaturedSection>

          <FeaturedSection title="Top Edits" icon={faFire}>
            <CompShelf onLoadMore={loadTopWorks} collection={EDITS} />
          </FeaturedSection>

          <FeaturedSection
            title={`Yeditor Spotlight: ${spotlightedYeditor?.display_name || 'Loading...'}`}
            icon={faStar}
          >
            <CompShelf onLoadMore={loadYeditorSpotlight} collection={COMPS} />
          </FeaturedSection>
        </div>
      </div>
    </>
  );
};
