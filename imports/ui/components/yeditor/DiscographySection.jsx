import React from 'react';
import { COMPS, EDITS } from '../../../api/collections/AvailableCollections';
import { CompShelf } from '../display/CompShelf';
import { SectionHeader } from '../layout/SectionHeader';
import { TabButton } from '../layout/TabButton';

export const DiscographySection = ({ activeTab, setActiveTab, onLoadMore }) => (
  <section className="mb-16">
    <SectionHeader title="Complete Discography" />

    <div className="flex justify-center mb-8 border-b border-white/10 relative">
      <TabButton
        isActive={activeTab === 'comps'}
        onClick={() => setActiveTab('comps')}
      >
        Comps
      </TabButton>
      <TabButton
        isActive={activeTab === 'edits'}
        onClick={() => setActiveTab('edits')}
      >
        Edits
      </TabButton>
      <TabButton
        isActive={activeTab === 'collabs'}
        onClick={() => setActiveTab('collabs')}
      >
        Collabs
      </TabButton>
    </div>

    <div className="flex justify-center">
      {activeTab === 'comps' && (
        <CompShelf
          onLoadMore={onLoadMore}
          collection={COMPS}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}

      {activeTab === 'edits' && (
        <CompShelf
          onLoadMore={onLoadMore}
          collection={EDITS}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}

      {activeTab === 'collabs' && (
        <CompShelf
          onLoadMore={onLoadMore}
          collection={EDITS}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}
    </div>
  </section>
);
