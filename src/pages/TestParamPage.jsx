import React from 'react';
import { useParams } from 'react-router-dom';

const TestParamPage = () => {
  const params = useParams();
  console.log('[TestParamPage] RAW PARAMS:', params);

  return (
    <div>
      <h1>Test Param Page</h1>
      <p>My Param: {params.myparam}</p>
      <p>Another Param: {params.anotherparam}</p>
    </div>
  );
};

export default TestParamPage; 