import React from 'react';

/** Error component renders a div with dark background that takes and error message as a child */

const Error = ({ children, isError }) => {
  return (
    <>
      <div
        className={isError && 'bounce-in-animation'}
        style={{
          width: '100%',
          height: 'fit-content',
          padding: '0.8rem',
          borderRadius: '0.25rem',
          backgroundColor: '#212121',
          textAlign: 'center',
          color: '#bfbfbf',
          fontSize: '0.8rem',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Error;
