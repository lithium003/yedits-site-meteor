import React, { useEffect } from 'react';
import { ERAS } from '../../utils/eras';

export const AdvancedSearch = ({
  filters,
  handleFilterChange,
  resetFilters,
  onClose,
  onSubmit
}) => {
  useEffect(() => {
    console.log('Advanced Search Mounted');
  }, []);

  // Get the styling of the selected era option, to apply it to the era selector itself.
  const selectedEra = ERAS.find(era => era.name === filters.era);
  const selectStyle = selectedEra ? selectedEra.style : {};

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
          {/* Era Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Era</label>
            <select
              value={filters.era}
              onChange={e => handleFilterChange('era', e.target.value)}
              className="w-full bg-[#2c2c2d] text-white rounded px-3 py-2"
              style={{
                ...selectStyle,
                fontWeight: selectedEra ? 'bold' : 'normal'
              }}
            >
              <option value="">Select an era...</option>
              {ERAS.map(era => (
                <option
                  key={era.id}
                  value={era.name}
                  style={{
                    ...era.style,
                    fontWeight: 'bold'
                  }}
                >
                  {era.name}
                </option>
              ))}
            </select>
          </div>

          {/* Apply/Reset Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Reset
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Overlay - Enables clicking off to close */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  );
};
