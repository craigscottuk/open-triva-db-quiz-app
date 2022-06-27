import { useEffect, useState } from 'react';
import he from 'he';

function useFetchData() {
  const [quizData, setQuizData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //  Fetches quiz data from opentdb.com/api

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
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
        // decodes any named and numerical HTML character references in the data using the he encoder/decoder
        const decodedData = data.results.map((item) => {
          return {
            ...item,
            question: he.decode(item.question),
            correct_answer: he.decode(item.correct_answer),
            incorrect_answers: item.incorrect_answers.map((incorrect) =>
              he.decode(incorrect)
            ),
          };
        });
        setQuizData(decodedData);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return { quizData, isLoading, isError };
}

export default useFetchData;
