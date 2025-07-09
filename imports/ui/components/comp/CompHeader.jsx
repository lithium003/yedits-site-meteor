import React from 'react';

export const CompHeader = ({ comp }) => (
  <section className="text-center mb-8 w-full ">
    <div className="flex items-center justify-center gap-12 border-4 border-purple-600 rounded-4xl">
      <div className="relative">
        <div className="w-64 h-64 rounded-xl overflow-hidden">
          <img
            src={comp.art_path}
            alt={comp.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);
