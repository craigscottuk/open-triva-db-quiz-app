import React from 'react';

/** Error component renders a div with dark background */

const Error = ({ children }) => {
  return (
    <>
      <div
        style={{
          width: '100%;',
          height: 'fit-content',
          padding: '0.8rem',
          borderRadius: '0.25rem',
          backgroundColor: '#212121',
          textAlign: 'center',
          color: '#bfbfbf',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Error;
