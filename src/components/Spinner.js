import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

/**
 Spinner component renders a spinner element from react-spinners
**/

const Loader = ({ isLoading }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <GridLoader
        loading={isLoading}
        css={{ display: 'block' }}
        size={30}
        color={'#454545'}
      />
    </div>
  );
};

export default Loader;
