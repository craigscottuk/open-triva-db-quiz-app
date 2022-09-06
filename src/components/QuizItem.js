import { React, useState } from 'react';
import './QuizItem.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';

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
  afterAnswerSelected,
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
    if (hasPickedAnswer === false) {
      const playerAnswer = event.target.innerHTML;
      setSelectedAnswer(playerAnswer);
      const wasPlayerCorrect = playerAnswer === correct_answer;
      onAnswerSelected(wasPlayerCorrect);
    } else {
      const areButtonsDisabled = true;
      afterAnswerSelected(areButtonsDisabled);
    }
  };

  const settingsThemeMUI = createTheme({
    palette: {
      mode: 'dark',
      // primary: grey,
      primary: {
        main: '#171717',
        dark: '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={settingsThemeMUI}>
      <div className='quizItem-div'>
        <p className='sans-question'>{question}</p>

        <div className='answBtns-div'>
          {shuffledAnswers &&
            shuffledAnswers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={selectAnswer}
                  className={
                    !hasPickedAnswer
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
        <Button
          // className={!hasPickedAnswer ? 'nxtBtn nxtBtn--disabled' : 'nxtBtn'}
          onClick={onNextBtnClick}
          disabled={!hasPickedAnswer}
          style={{ marginTop: '0.8rem' }}
          variant='contained'
          color='primary'
          size='large'
          disableElevation
          // sx={{
          //   backgroundColor: '#181818',
          // }}
        >
          Next
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default QuizItem;
