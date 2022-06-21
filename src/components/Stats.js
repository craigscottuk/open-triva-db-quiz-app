/**
 * Stats component renders the score, the current question number and the total number of questions
 *
 */

import React from 'react';

const Stats = (props) => {
  return (
    <div className='stats-container'>
      <p>Score: {props.score}</p>
      <p>
        Question: {props.questionNum}/{props.totalQuestions}{' '}
      </p>
      <p>{props.isGameOver ? 'Game is over' : 'Game is not over'}</p>
    </div>
  );
};

export default Stats;
