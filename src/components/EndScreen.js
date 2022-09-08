import React from 'react';
import NewGameButton from './NewGameButton';

/**
 * EndScreen renders the final game state - the final score, a trophey and a retry button.
 * @param {object} props
 * @param {number} props.score
 * @param {onClick} props.onRetryBtnClick
 */

const EndScreen = ({ score, newGame }) => {
  return (
    <div className='end-screen'>
      <p className='quiz-complete'>Quiz complete!</p>
      <div style={{ fontSize: '6.5rem' }}>🏆</div>
      <div className='game-stats'>
        <ul style={{ margin: '1rem 0' }}>
          <li className='sans-stat-title' style={{ fontSize: '2rem' }}>
            Score:
          </li>
          <li className='sans-stat-value' style={{ fontSize: '4rem' }}>
            {score}
          </li>
        </ul>
      </div>
      <div className='review-restart'>
        <NewGameButton newGame={newGame} />
      </div>
    </div>
  );
};

export default EndScreen;
