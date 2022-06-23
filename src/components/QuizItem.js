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
  return (
    <>
      <p>{question}</p>
      <ul className='quizItem--answer-items-ul'>
        <li>
          <button className='quizItem--answer-btn'>{correct_answer}</button>
        </li>
        <li>
          <button className='quizItem--answer-btn'>
            {incorrect_answers[0]}
          </button>
        </li>
        <li>
          <button className='quizItem--answer-btn'>
            {incorrect_answers[1]}
          </button>
        </li>
        <li>
          <button className='quizItem--answer-btn'>
            {incorrect_answers[2]}
          </button>
        </li>
      </ul>

      <button className='quizItem--next-btn' onClick={onNextBtnClick}>
        Next
      </button>
    </>
  );
};

export default QuizItem;
