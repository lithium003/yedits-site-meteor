import React from 'react';
import { SectionHeader } from './SectionHeader';

export const FeaturedSection = ({
  title = '',
  icon = null,
  children = null
}) => (
  <section className="mb-16">
    <SectionHeader title={title} icon={icon} />
    <div className="flex justify-center">{children}</div>
  </section>
);
