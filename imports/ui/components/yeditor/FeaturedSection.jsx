import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { CompShelf } from '../CompShelf';

export const FeaturedSection = ({ title, icon, onLoadMore, collection }) => (
  <section className="mb-16">
    <SectionHeader title={title} icon={icon} />
    <div className="flex justify-center">
      <CompShelf
        onLoadMore={onLoadMore}
        collection={collection}
        skipBackEnabled={false}
        loadMoreEnabled={false}
        centerItems={true}
      />
    </div>
  </section>
);
