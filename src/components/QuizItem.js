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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const hasUserSelectedAnswer = selectedAnswer !== null;

  // Creates an array of allAnswers using correct_answer and expanding the incorrect_answers array.
  const allAnswers = [correct_answer, ...incorrect_answers];

  // allAnswers are shuffled using sort() and Math.
  const [shuffledAnswers] = useState(() =>
    [...allAnswers].sort(() => Math.random() - 0.5)
  );

  const selectAnswer = (event) => {
    if (hasUserSelectedAnswer === false) {
      const playerAnswer = event.target.innerHTML;
      setSelectedAnswer(playerAnswer);
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
              onClick={selectAnswer}
              className={
                !hasUserSelectedAnswer
                  ? 'answBtn'
                  : answer === selectedAnswer && answer === correct_answer
                  ? 'answBtn answBtn--correct'
                  : answer === selectedAnswer && answer !== correct_answer
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
        hasUserSelectedAnswer={hasUserSelectedAnswer}
      />
    </div>
  );
};

export default QuizItem;
