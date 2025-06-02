import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const Comp = () => {
  const { comp_id } = useParams();
  const [comp, setComp] = useState({
    name: 'MISSING NAME',
    yeditor: 'MISSING YEDITOR ID',
    yeditor_name: 'MISSING YEDITOR NAME',
    art_path: 'MISSING PATH'
  });

  useEffect(() => {
    Meteor.call('getComp', comp_id, (err, result) => {
      if (err) {
        console.error('Failed to fetch comp:', err);
      } else {
        setComp(result);
        console.log(result);
      }
    });
  }, []);

  const { name, yeditor, yeditor_name, art_path } = comp;

  return (
    <>
      <Helmet>
        <title>{name} - Yedits</title>
      </Helmet>
      <div className="w-[300px] flex flex-col items-center justify-center space-y-2">
        <img
          className="w-full h-[300px] rounded-xl object-cover mb-1"
          src={art_path}
          alt={name}
        />
        <span className="text-center text-md font-bold truncate mb-0 w-full">
          {name}
        </span>

        <Link
          to={`/yeditor/${yeditor}`}
          className="text-gray-400 text-md truncate"
        >
          <span className="hover:underline">{yeditor_name}</span>
        </Link>
      </div>
    </>
  );
};
