import React from 'react';

/**
 * Stats component renders the score, the current question number and the total number of questions in the game.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNum
 * @param {number} props.totalQuestions
 */

const Stats = ({ score, questionNum, totalQuestions }) => {
  return (
    <div className='game-stats'>
      <ul>
        <li className='sans-stat-title'>Score:</li>
        <li className='sans-stat-value'>{score}</li>
      </ul>
      <ul>
        <li className='sans-stat-title'>Question:</li>
        <li className='sans-stat-value'>
          {questionNum}
          <span className='sans-stat-value-small'>/{totalQuestions}</span>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
