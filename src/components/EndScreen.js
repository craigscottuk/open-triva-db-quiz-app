import React from 'react';
import NewGameButton from './NewGameBtn';

/**
 EndScreen renders the final score and a button to create a new game.
 **/

const EndScreen = ({ score, newGame, totalNumOfQuestions }) => {
  return (
    <div className='end-screen'>
      <div className='quiz-logo'>
        <h1 class='logo fade-in-animation' style={{ fontSize: '4rem' }}>
          QUIZ
        </h1>
      </div>
      <p className='complete bounce-in-animation'>Complete!</p>
      <div className='trophy attention-animation'>🏆</div>
      <div className='game-stats'>
        <ul style={{ margin: '0.8rem 0' }}>
          <li
            className='sans-stat-title fade-in-animation'
            style={{ fontSize: '2rem' }}
          >
            Score:
          </li>
          <li className='sans-stat-value bounce-animation'>
            <span className='bounce' style={{ fontSize: '4rem' }}>
              {score}
            </span>
            <span
              className='sans-stat-value-small'
              style={{ fontSize: '1.8rem' }}
            >
              /{totalNumOfQuestions}
            </span>
          </li>
        </ul>
      </div>
      <div className='fade-in-animation'>
        <NewGameButton newGame={newGame} />
      </div>
    </div>
  );
};

export default EndScreen;
