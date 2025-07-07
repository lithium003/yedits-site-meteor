import React from 'react';
import { YeditorPhoto } from './YeditorPhoto';
import { SocialButton } from '../SocialButton';
import {
  faDiscord,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

export const YeditorHeader = ({ yeditor }) => (
  <section className="text-center mb-8">
    <div className="flex items-center justify-center gap-12 max-w-5xl">
      <div className="relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500">
          <YeditorPhoto
            yeditor={yeditor}
            size="256"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 text-left">
        <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
          {yeditor.display_name}
        </h1>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl">
          {yeditor.bio ||
            'A passionate yeditor creating amazing comps and edits'}
        </p>

        <div className="flex gap-4 flex-wrap">
          <SocialButton
            href="https://discord.com/invite/yedits"
            icon={faDiscord}
            bgColor="bg-[#5865F2]"
            hoverColor="hover:bg-indigo-700"
          />
          <SocialButton
            href="#"
            icon={faTwitter}
            bgColor="bg-[#1DA1F2]"
            hoverColor="hover:bg-blue-600"
          />
          <SocialButton
            href="#"
            icon={faYoutube}
            bgColor="bg-[#FF0000]"
            hoverColor="hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  </section>
);
