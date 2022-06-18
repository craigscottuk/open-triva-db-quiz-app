import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

const Loader = (props) => {
  return (
    <>
      <GridLoader
        loading={props.isLoading}
        css={{ display: 'block' }}
        size={10}
        color={'gray'}
      />
    </>
  );
};

export default Loader;
