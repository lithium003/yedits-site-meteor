import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { CompShelf } from '../CompShelf';

export const FeaturedSection = ({ title, icon, items }) => (
  <section className="mb-16">
    <SectionHeader title={title} icon={icon} />
    <div className="flex justify-center">
      <CompShelf
        items={items}
        skipBackEnabled={false}
        loadMoreEnabled={false}
        centerItems={true}
      />
    </div>
  </section>
);
