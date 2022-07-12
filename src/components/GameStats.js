import React from 'react';

/**
 * Stats component renders the score, the current question number and the total number of questions in the game.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNum
 * @param {number} props.totalQuestions
 */

const GameStats = ({ score, questionNum, totalQuestions }) => {
  return (
    <>
      <ul>
        <li className='sans-cond'>Score:</li>
        <li className='sans-fat'>{score}</li>
      </ul>
      <ul>
        <li className='sans-cond'>Question:</li>
        <li className='sans-fat'>
          {questionNum}
          <span className='sans-small-fat'>/{totalQuestions}</span>
        </li>
      </ul>
    </>
  );
};

export default GameStats;
