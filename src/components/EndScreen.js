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
    <>
      <p>Quiz Complete!</p>
      <p>🏆</p>
      <EndStat label='Score' value={score} />
      <EndStat label='Best score' value={bestScore} />
      <button onClick={onRetryBtnClick}>Retry?</button>
    </>
  );
};

export default EndScreen;
