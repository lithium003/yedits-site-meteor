import React, { useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { ToastContainer, toast, Flip } from 'react-toastify';

export const TrackPopup = editId => {
  const [showTrackPopup, setShowTrackPopup] = useState(false);

  const copyLink = editId => {
    const currentUrl = window.location.origin + window.location.pathname;
    const parts = currentUrl.split('/');
    const compId = parts[parts.indexOf('comp') + 1];
    const fullUrl = `${window.location.origin}/comp/${compId}/${editId}`;
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        toast.success('Copied link to clipboard');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        className="p-1 cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          setShowTrackPopup(true);
        }}
      >
        <RiMoreFill />
      </button>

      {showTrackPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowTrackPopup(false)}
        >
          <div
            id="modal"
            className="w-24 max-w-24 bg-gray-500 px-4 py-2 rounded cursor-pointer overflow-y-auto drop-shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => copyLink(editId)}>Copy Link</button>
            <button>Show Credits</button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Flip}
            />
          </div>
        </div>
      )}
    </>
  );
};
