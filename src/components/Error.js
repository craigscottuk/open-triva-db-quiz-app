import React from 'react';
import { FaExclamation } from 'react-icons/fa';

const Error = () => {
  return (
    <>
      <FaExclamation size={'5rem'} />
      <p className='error-msg'>Sorry! Unable to fetch the quiz data.</p>
    </>
  );
};

export default Error;
