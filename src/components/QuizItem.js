import { React, useState } from 'react';
import NextButton from './NextBtn';

/**
  QuizItem component renders each quiz question from the data.
**/

const QuizItem = ({
  question,
  correct_answer,
  incorrect_answers,
  onNextBtnClick,
  onAnswerSelected,
  afterAnswerSelected,
}) => {
  // Combines the correct answer with incorrect answers for each quiz item
  const allAnswers = [correct_answer, ...incorrect_answers];

  // Shuffles all the answers for that quiz item
  const [shuffledAnswers] = useState(() =>
    [...allAnswers].sort(() => Math.random() - 0.5)
  );

  // SelectedAnwer state to keep track if player has selected an answer or not
  const [theSelectedAnswer, setTheSelectedAnswer] = useState(null);
  const hasPlayerSelectedAnswer = theSelectedAnswer !== null;

  // When player selects an answer, find out if the player was correct or not
  const onPlayerSelectsAnswer = (event) => {
    if (hasPlayerSelectedAnswer === false) {
      const playerAnswer = event.target.innerHTML;
      setTheSelectedAnswer(playerAnswer);
      const wasPlayerCorrect = playerAnswer === correct_answer;
      onAnswerSelected(wasPlayerCorrect);
    } else {
      const areButtonsDisabled = true;
      afterAnswerSelected(areButtonsDisabled);
    }
  };

  return (
    <div className='quizItem-div'>
      <p className='sans-question'>{question}</p>
      <div className='answBtns-div'>
        {shuffledAnswers.map((answer, index) => {
          return (
            <button
              key={index}
              onClick={onPlayerSelectsAnswer}
              className={
                !hasPlayerSelectedAnswer
                  ? 'answBtn'
                  : answer === theSelectedAnswer && answer === correct_answer
                  ? 'answBtn answBtn--correct'
                  : answer === theSelectedAnswer && answer !== correct_answer
                  ? 'answBtn answBtn--incorrect'
                  : answer === correct_answer
                  ? 'answBtn answBtn--reveal-answ'
                  : 'answBtn answBtn--disabled'
              }
            >
              {answer}
            </button>
          );
        })}
      </div>
      <NextButton
        onNextBtnClick={onNextBtnClick}
        hasPlayerSelectedAnswer={hasPlayerSelectedAnswer}
      />
    </div>
  );
};

export default QuizItem;
