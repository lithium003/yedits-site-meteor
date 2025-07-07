import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { TabButton } from '../TabButton';
import { CompShelf } from '../CompShelf';

export const DiscographySection = ({
  activeTab,
  setActiveTab,
  allComps,
  allEdits
}) => (
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
          items={allComps}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}

      {activeTab === 'edits' && (
        <CompShelf
          items={allEdits}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}

      {activeTab === 'collabs' && (
        <CompShelf
          items={allEdits}
          defaultWidth={5}
          skipBackEnabled={true}
          loadMoreEnabled={true}
        />
      )}
    </div>
  </section>
);
