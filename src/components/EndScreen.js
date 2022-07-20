import React from 'react';

function EndStat({ label, value }) {
  return (
    <>
      <div>{label}</div>
      <div>{value}</div>
    </>
  );
}

/**
 * EndScreen renders the final game state - the final score, a trophey and a retry button.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {onClick} props.onRetryBtnClick
 */

const EndScreen = ({ score, bestScore, onRetryBtnClick }) => {
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
        <button onClick={onRetryBtnClick}>Review</button>
        <button onClick={onRetryBtnClick}>Play again</button>
      </div>
    </div>
  );
};

export default EndScreen;
