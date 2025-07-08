import { Meteor } from 'meteor/meteor';
import { useCallback } from 'react';

// Custom hook for creating Meteor call load functions
export const useMeteorLoader = (methodName, params = {}, dependencies = []) => {
  return useCallback(
    ({ collection, lastId, onSuccess, onError, ...additionalParams }) => {
      const callParams = {
        collection,
        lastId,
        ...params,
        ...additionalParams
      };

      Meteor.call(methodName, callParams, (err, result) => {
        if (err) onError(err);
        else onSuccess(result);
      });
    },
    [methodName, ...dependencies]
  );
};
