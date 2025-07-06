import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { YeditorPhoto } from '../components/yeditor/YeditorPhoto';
import { Helmet } from 'react-helmet';
import { COMPS, EDITS } from '../../api/collections/AvailableCollections';
import { ERAS } from '../../utils/eras';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { getDateFromTimestamp } from '../../utils/firestoreHandling';

export const Yeditor = () => {
  const { yeditorId } = useParams();
  const [yeditor, setYeditor] = useState(null);
  const [compsTop, setCompsTop] = useState([]);
  const [editsTop, setEditsTop] = useState([]);
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

  useEffect(() => {
    console.log('yeditorId: ', yeditorId);
    Meteor.call(
      'getYeditorTop',
      { collection: COMPS, numResults: 5, yeditorId: yeditorId },
      (err, res) => {
        if (err) {
          console.error('Error fetching top data:', err);
        } else {
          setCompsTop(res);
        }
      }
    );
    Meteor.call(
      'getYeditorTop',
      { collection: EDITS, numResults: 5, yeditorId: yeditorId },
      (err, res) => {
        if (err) {
          console.error('Error fetching top data:', err);
        } else {
          setEditsTop(res);
        }
      }
    );
  }, [yeditorId]);

  if (!yeditor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>{yeditor.display_name} - Yedits</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-8">
            <div className="flex items-center justify-center gap-12 max-w-5xl mx-auto">
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/40">
                  <YeditorPhoto
                    yeditor={yeditor}
                    size="256"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-md -z-10"></div>
              </div>

              <div className="flex-1 text-left">
                <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                  {yeditor.display_name}
                </h1>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                  {yeditor.bio ||
                    'A passionate yeditor creating amazing comps and edits'}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 flex-wrap">
                  <a
                    href="https://discord.com/invite/yedits"
                    className="w-11 h-11 bg-[#5865F2] rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">
                      <FontAwesomeIcon icon={faDiscord} />
                    </span>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">
                      <FontAwesomeIcon icon={faTwitter} />
                    </span>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">
                      <FontAwesomeIcon icon={faYoutube} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                12
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Comps
              </div>
              <div className="absolute top-4 right-4 text-3xl opacity-20">
                <i className="fas fa-compact-disc"></i>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                28
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Edits
              </div>
              <div className="absolute top-4 right-4 text-3xl opacity-20">
                <i className="fas fa-wrench"></i>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                6
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Collabs
              </div>
              <div className="absolute top-4 right-4 text-3xl opacity-20">
                <i className="fas fa-users"></i>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                4.3★
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Avg Rating
              </div>
              <div className="absolute top-4 right-4 text-3xl opacity-20">
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>

          {/* Top Comps Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-4">
                <i className="fas fa-star text-purple-400"></i>
                Top Comps
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {compsTop.map((comp, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
                    <img src={comp.art_path} alt={comp.name} />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 truncate">
                      {comp.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">
                        {comp.rating.toFixed(1)}★
                      </span>
                      <span
                        style={ERAS.find(era => era.name === comp.era)?.style}
                        className={`px-2 py-1 rounded-full text-xs font-bold text-white`}
                      >
                        {comp.era}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Edits Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-4">
                <i className="fas fa-fire text-orange-400"></i>
                Top Edits
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {editsTop.map((edit, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
                    <img src={edit.art_path} alt={edit.name} />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 rounded-full text-sm font-semibold">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 truncate">
                      {edit.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-semibold">
                        {edit.rating}★
                      </span>
                      <span
                        style={ERAS.find(era => era.name === edit.era)?.style}
                        className={`px-2 py-1 rounded-full text-xs font-bold text-white `}
                      >
                        {edit.era}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Complete Discography Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Complete Discography
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8 border-b border-white/10 relative">
              <button
                onClick={() => setActiveTab('comps')}
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative ${
                  activeTab === 'comps'
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Comps
                {activeTab === 'comps' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('edits')}
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative ${
                  activeTab === 'edits'
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Edits
                {activeTab === 'edits' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('collabs')}
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 relative ${
                  activeTab === 'collabs'
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Collabs
                {activeTab === 'collabs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === 'comps' && (
                <div className="grid grid-cols-6 gap-4">
                  {compsTop.map((comp, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
                        <img src={comp.art_path} alt={comp.name} />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-gradient-to-r from-purple-400 to-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                            View
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-white mb-2 truncate">
                          {comp.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {getDateFromTimestamp(
                              comp.release_date
                            ).getFullYear()}
                          </span>
                          <span
                            style={
                              ERAS.find(era => era.name === comp.era)?.style
                            }
                            className={`px-2 py-0.5 rounded-full text-xs font-bold text-white `}
                          >
                            {comp.era}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'edits' && (
                <div className="grid grid-cols-6 gap-4">
                  {editsTop.map((edit, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-2xl font-bold">
                          <img src={edit.art_path} alt={edit.name} />
                        </div>
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-gradient-to-r from-orange-400 to-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                            View
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-white mb-2 truncate">
                          {edit.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {edit.year}
                          </span>
                          <span
                            style={
                              ERAS.find(era => era.name === edit.era)?.style
                            }
                            className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`}
                          >
                            {edit.era}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'collabs' && (
                <div className="grid grid-cols-6 gap-4">
                  {editsTop.map((credit, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-green-500 to-blue-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-2xl font-bold">
                          <img src={credit.art_path} alt={credit.name} />
                        </div>
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-gradient-to-r from-green-400 to-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                            View
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-white mb-2 truncate">
                          {credit.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {credit.year}
                          </span>
                          <span
                            style={
                              ERAS.find(era => era.name === credit.era)?.style
                            }
                            className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`}
                          >
                            {credit.era}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button className="w-11 h-11 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="w-11 h-11 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </section>

          {/* Connect Section */}
          <section className="text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Want to talk to them directly?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
            </div>
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
        </div>
      </div>
    </div>
  );
};
