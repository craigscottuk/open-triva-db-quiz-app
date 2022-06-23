import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routers, Route } from 'react-router-dom';
import EndScreen from './components/EndScreen';
import Error from './components/Error';
import Loader from './components/Loader';
import QuizItem from './components/QuizItem';
import Stats from './components/Stats';

export default function App() {
  const [quizData, setQuizData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function Game() {}
  const [gameState, setGameState] = useState({
    score: 0,
    quizDataIndex: 0,
    isGameOver: false,
  });

  // Fetching quiz data from opentdb.com/api

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      'https://opentdb.com/api.php?amount=2&category=18&difficulty=easy&type=multiple'
    )
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setIsError(false);
        setQuizData(data.results);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  // // console.log(quizData);
  // quizData &&
  //   quizData.forEach((quizQuestion, index) => {
  //     const { question, correct_answer, incorrect_answers } = quizQuestion;
  //     const allAnswers = shuffle([correct_answer, ...incorrect_answers]);
  //     console.log(index);
  //     console.log(question);
  //     console.log(allAnswers);
  //   });

  // // Shuffles the array of AllAnswers
  // function shuffle(allAnswersArr) {
  //   return allAnswersArr.sort(() => Math.random() - 0.5);
  // }

  // console.log(quizData);

  const { score, quizDataIndex, isGameOver } = gameState;

  const quizQuestion = quizData && quizData[quizDataIndex];
  const { question, correct_answer, incorrect_answers } = quizQuestion;

  const questionNum = quizDataIndex + 1;
  const totalQuestions = quizData.length;

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
    setGameState((prevGameState) => {
      return { ...prevGameState, quizDataIndex: quizDataIndex + 1 };
    });
  };

  return (
    <div className='app'>
      {isError && <Error error={isError} />}
      {isLoading && <Loader isLoading={isLoading} />}
      {quizData && (
        <main>
          {!isGameOver ? (
            <>
              <Stats
                score={score}
                questionNum={questionNum}
                isGameOver={isGameOver}
                totalQuestions={totalQuestions}
              />
              <QuizItem
                question={question}
                correct_answer={correct_answer}
                incorrect_answers={incorrect_answers}
                onNextBtnClick={loadNextPage}
              />
            </>
          ) : (
            <EndScreen
              score={score}
              bestScore={0}
              onRetryBtnClick={restartGame}
            />
          )}
        </main>
      )}
    </div>
  );
}
