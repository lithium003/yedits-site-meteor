import React from 'react';

export const AdvancedSearch = ({ onClose, onSubmit }) => {
  return (
    <>
      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1d] rounded-lg p-4 shadow-lg z-50">
        <div className="space-y-4">
          {/* Yeditor Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Yeditor</label>
            <input
              type="text"
              value={''}
              className="w-full bg-[#2c2c2d] text-white rounded px-3 py-2"
              placeholder="Filter by yeditor..."
            />
          </div>
          {/* Genre Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Genre</label>
            <input
              type="text"
              value={''}
              className="w-full bg-[#2c2c2d] text-white rounded px-3 py-2"
              placeholder="Filter by genre..."
            />
          </div>
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Date Range
            </label>
            <select className="w-full bg-[#2c2c2d] text-white rounded px-3 py-2">
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          {/* Apply/Reset Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Reset
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Overlay - Enables clicking off to close */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  );
};
