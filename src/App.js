import React from 'react';
import './style.css';
import { BrowserRouter as Router, Routers, Route } from 'react-router-dom';

export default function App() {
  const [quizData, setQuizData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(null);

  // Fetching quiz data from opentdb.com/api

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      'https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple'
    )
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setIsError(null);
        setQuizData(data.results);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError('Sorry! Unable to fetch the quiz data.');
      });
  }

  // console.log(quizData);
  quizData &&
    quizData.forEach((quizQues, index) => {
      const { question, correct_answer, incorrect_answers } = quizQues;
      const allAnswers = shuffle([correct_answer, ...incorrect_answers]);
      console.log(index);
      console.log(question);
      console.log(allAnswers);
    });

  // Shuffles the array of AllAnswers
  function shuffle(allAnswersArr) {
    return allAnswersArr.sort(() => Math.random() - 0.5);
  }

  return (
    <div className='app'>
      {isError && <div>{isError}</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
