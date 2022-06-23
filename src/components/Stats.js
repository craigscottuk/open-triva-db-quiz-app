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
    <>
      <p>Score: {score}</p>
      <p>
        Question: {questionNum}/{totalQuestions}
      </p>
    </>
  );
};

export default Stats;
