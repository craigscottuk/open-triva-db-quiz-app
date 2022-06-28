import { React, useState } from 'react';

/**
 * QuizItem component renders each quiz question from the data.
 * @param {object} props
 * @param {string} props.question
 * @param {string} props.correct_answer
 * @param {string} props.incorrect_answers
 * @param {()=> void} props.onNextBtnClick
 * @param {(boolean)=> void)} props.onAnswerSelected
 */

const QuizItem = ({
  question,
  correct_answer,
  incorrect_answers,
  onNextBtnClick,
  onAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const hasPickedAnswer = selectedAnswer !== null;

  // Creates an array of allAnswers using correct_answer and expanding the incorrect_answers array.
  const allAnswers = [correct_answer, ...incorrect_answers];

  // allAnswers are shuffled using sort() and Math.
  const [shuffledAnswers] = useState(() =>
    allAnswers.sort(() => Math.random() - 0.5)
  );

  const selectAnswer = (event) => {
    const playerAnswer = event.target.innerHTML;
    setSelectedAnswer(playerAnswer);
    const wasPlayerCorrect = playerAnswer === correct_answer;
    onAnswerSelected(wasPlayerCorrect);
  };

  return (
    <>
      <p>{question}</p>
      {selectedAnswer === correct_answer ? (
        <div>
          <button className='quizItem--answer-btn correct'>
            {selectedAnswer}
          </button>
        </div>
      ) : (
        <div className='quizItem--answer-items-div'>
          {shuffledAnswers &&
            shuffledAnswers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={selectAnswer}
                  className={
                    !hasPickedAnswer
                      ? 'quizItem--answer-btn'
                      : answer === selectedAnswer && answer === correct_answer
                      ? 'quizItem--answer-btn correct'
                      : answer === selectedAnswer && answer !== correct_answer
                      ? 'quizItem--answer-btn incorrect'
                      : answer === correct_answer
                      ? 'quizItem--answer-btn reveal-answer'
                      : 'quizItem--answer-btn disabled'
                  }
                  disabled={hasPickedAnswer}
                >
                  {answer}
                </button>
              );
            })}
        </div>
      )}
      {
        <button
          className={
            !hasPickedAnswer
              ? 'quizItem--next-btn disabled'
              : 'quizItem--next-btn'
          }
          onClick={onNextBtnClick}
          disabled={!hasPickedAnswer}
        >
          Next
        </button>
      }
      <button className='quizItem--quit-btn' onClick={onNextBtnClick}>
        Quit
      </button>
    </>
  );
};

export default QuizItem;
