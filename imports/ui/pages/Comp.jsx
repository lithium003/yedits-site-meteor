import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { CompAdminPanel } from '../components/comp/CompAdminPanel';
import { CompHeader } from '../components/comp/CompHeader';
import { Tracklist } from '../components/comp/Tracklist';
import { ErrorScreen } from '../components/error/ErrorScreen';
import { CompHeaderSkeleton } from '../components/skeletons/CompHeaderSkeleton';

export const Comp = () => {
  const { compId } = useParams();
  const [comp, setComp] = useState(null);
  const [edits, setEdits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false); // TODO eventually connect to account

  // Highlighted Edit
  const [searchParams] = useSearchParams();
  const highlightEditId = searchParams.get('h') ?? '';

  // Get comp data
  useEffect(() => {
    Meteor.call('getComp', compId, (err, res) => {
      if (err) {
        console.error('Error fetching comp:', err);
      } else {
        setComp(res);
      }
    });
  }, [compId]);

  // Get all edits for the comp
  useEffect(() => {
    Meteor.call('getCompEdits', compId, (err, res) => {
      if (err) {
        console.error(`Error fetching edits for comp ${compId}:`, err);
      } else {
        setEdits(res);
      }
      setLoading(false);
    });
  }, [compId]);

  if (!loading && !comp) {
    return <ErrorScreen message="Comp not found" />;
  }

  return (
    <>
      <Helmet>
        <title>{comp ? comp.name : 'Loading...'} - Yedits</title>
      </Helmet>
      <div className="min-h-screen text-white ">
        <div className="max-w-6xl mx-auto px-8 py-8 ">
          {!comp ? (
            <CompHeaderSkeleton />
          ) : (
            <>
              <CompHeader comp={comp} edits={edits} />
              {adminMode && <CompAdminPanel comp={comp} />}
              <Tracklist
                comp={comp}
                edits={edits}
                highlightEditId={highlightEditId}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
