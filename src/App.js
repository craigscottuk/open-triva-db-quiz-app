import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routers, Route } from 'react-router-dom';
import Answers from './components/Answers';
import Error from './components/Error';
import Loader from './components/Loader';
import Question from './components/Question';
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
  const quizQuestion = quizData[quizDataIndex];
  const questionNum = quizDataIndex + 1;
  const totalQuestions = quizData.length;

  return (
    <div className='app'>
      {isError && <Error error={isError} />}
      {isLoading && <Loader isLoading={isLoading} />}
      {quizData && (
        <main>
          <Stats
            score={score}
            questionNum={questionNum}
            isGameOver={isGameOver}
            totalQuestions={totalQuestions}
          />
          <Question quizQuestion={quizQuestion} />
          <Answers />
        </main>
      )}
    </div>
  );
}
