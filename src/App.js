import { React, useState } from 'react';
import './App.css';
// import { BrowserRouter as Router, Routers, Route } from 'react-router-dom';
import useFetchData from './components/useFetchData';
import Loader from './components/Loader';
import Error from './components/Error';
import Stats from './components/Stats';
import QuizItem from './components/QuizItem';
import EndScreen from './components/EndScreen';
import { FadeWrapper, FadeTransition } from './components/fadeTransition';

const App = () => {
  // useFetchData is a custom hook that fetches the quiz data
  const { quizData, isLoading, isError } = useFetchData(2, 'easy');

  const [gameState, setGameState] = useState({
    score: 0,
    quizDataIndex: 0,
    isGameOver: false,
  });

  // RestartGame function resets the gameState values thus restarting/resetting the game
  const restartGame = () => {
    setGameState({
      score: 0,
      quizDataIndex: 0,
      isGameOver: false,
    });
  };

  // LoadNextPage function uses spread operator to copy the gameState and adds 1 to quizDataIndex thus moving to the next page
  const loadNextPage = () => {
    if (quizDataIndex >= quizData.length - 1) {
      setGameState({
        ...gameState,
        isGameOver: true,
      });
    } else {
      setGameState({ ...gameState, quizDataIndex: quizDataIndex + 1 });
    }
  };

  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          score: score + 1,
        };
      });
    }
  };

  const { score, quizDataIndex, isGameOver } = gameState;
  const { question, correct_answer, incorrect_answers } =
    quizData && quizData[quizDataIndex];

  return (
    <div className='app'>
      <header>
        {!isGameOver && (
          <Stats
            score={score}
            questionNum={quizDataIndex + 1}
            isGameOver={isGameOver}
            totalQuestions={quizData.length}
          />
        )}
      </header>
      <main>
        {isError && <Error error={isError} />}
        {isLoading && <Loader isLoading={isLoading} />}
        {quizData && (
          <>
            {!isGameOver ? (
              <FadeWrapper>
                <FadeTransition>
                  <QuizItem
                    key={quizDataIndex}
                    question={question}
                    correct_answer={correct_answer}
                    incorrect_answers={incorrect_answers}
                    onNextBtnClick={loadNextPage}
                    onAnswerSelected={onAnswerSelected}
                  />
                </FadeTransition>
              </FadeWrapper>
            ) : (
              <FadeWrapper>
                <FadeTransition>
                  <EndScreen
                    key={'EndScreen'}
                    score={score}
                    bestScore={0}
                    onRetryBtnClick={restartGame}
                  />
                </FadeTransition>
              </FadeWrapper>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
