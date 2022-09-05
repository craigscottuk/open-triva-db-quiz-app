import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewGame = () => {
  const navigate = useNavigate();
  return (
    <div>
      sauage
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        New Game
      </button>
    </div>
  );
};

export default NewGame;
