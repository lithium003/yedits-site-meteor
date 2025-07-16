import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SectionHeader } from '../layout/SectionHeader';

export const ConnectSection = () => (
  <section className="text-center">
    <SectionHeader title="Want to talk to them directly?" />
    <div className="flex justify-center">
      <a
        href="https://discord.com/invite/yedits"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] text-white font-semibold rounded-full border border-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="text-xl">
          <FontAwesomeIcon icon={faDiscord} />
        </span>
        Join the Discord!
      </a>
    </div>
  </section>
);
