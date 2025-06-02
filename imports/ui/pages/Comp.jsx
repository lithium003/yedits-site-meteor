import { Helmet } from 'react-helmet';
import React from 'react';
import { useParams } from 'react-router-dom';

export const Comp = () => {
  const { comp_id } = useParams();
  return (
    <>
      <Helmet>
        <title>Yedits - Comp</title>
      </Helmet>
      <p>{comp_id}</p>
    </>
  );
};
