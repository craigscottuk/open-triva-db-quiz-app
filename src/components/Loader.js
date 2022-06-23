import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

/**
 * Loader component renders a spinner element from react-spinners
 * @param {object} props
 * @param {boolean} props.isLoading
 */

const Loader = ({ isLoading }) => {
  return (
    <>
      <GridLoader
        loading={isLoading}
        css={{ display: 'block' }}
        size={10}
        color={'gray'}
      />
    </>
  );
};

export default Loader;
