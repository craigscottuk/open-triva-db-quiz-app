import React from 'react';
import { FaExclamation } from 'react-icons/fa';

/** Error component renders an exclamation mark icon and some text */

const Error = () => {
  return (
    <>
      <FaExclamation size={'4rem'} />
      <p className='error-msg'>Sorry! Unable to fetch the quiz data.</p>
    </>
  );
};

export default Error;
