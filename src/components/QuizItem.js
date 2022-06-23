import React from 'react';

/**
 * QuizItem component renders each quiz question from the data.
 * @param {object} props
 * @param {string} props.question
 * @param {string} props.correct_answer
 * @param {string} props.incorrect_answers
 * * @param {onClick} props.onNextBtnClick
 */

const QuizItem = ({
  question,
  correct_answer,
  incorrect_answers,
  onNextBtnClick,
}) => {
  // Creates an array of allAnswers using correct_answer and expanding the incorrect_answers array.
  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
    //The array elements are shuffled using sort() and Math.
  );

  return (
    <>
      <p>{question}</p>
      <ul className='quizItem--answer-items-ul'>
        {shuffledAnswers.map((answer, index) => {
          return (
            <li key={index} className='quizItem--answer-btn'>
              {answer}
            </li>
          );
        })}
      </ul>

      <button className='quizItem--next-btn' onClick={onNextBtnClick}>
        Next
      </button>
    </>
  );
};

export default QuizItem;
