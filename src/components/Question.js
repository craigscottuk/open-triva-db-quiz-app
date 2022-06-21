/**
 * Questions component renders each quiz question from the data
 *
 */

import React from 'react';

const Question = (props) => {
  return (
    <div className='question-container'>
      <p>{props.quizQuestion.question}</p>
    </div>
  );
};

export default Question;
