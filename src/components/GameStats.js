import React from 'react';

/**
 Stats component renders the score, the category, the current question number and the total number of questions in the game.
 **/

const Stats = ({
  score,
  questionNum,
  totalNumOfQuestions,
  isLoaded,
  questionItem,
  isGameSet,
}) => {
  return (
    <div key={'GameSettings'} className='game-stats'>
      <ul>
        <li className='sans-stat-title'>Score:</li>
        {isLoaded && isGameSet && <li className='sans-stat-value'>{score}</li>}
      </ul>
      <ul>
        <li className='sans-stat-title'>Category:</li>
        {isLoaded && isGameSet && (
          <li className='sans-stat-value'>
            {questionItem.category.substring(0, 15) === 'Entertainment: '
              ? questionItem.category.substring(15)
              : questionItem.category.substring(0, 9) === 'Science: '
              ? questionItem.category.substring(9)
              : questionItem.category}
          </li>
        )}
      </ul>
      <ul>
        <li className='sans-stat-title'>Question:</li>
        {isLoaded && isGameSet && (
          <li className='sans-stat-value'>
            {questionNum + 1}
            <span className='sans-stat-value-small'>
              /{totalNumOfQuestions}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Stats;
