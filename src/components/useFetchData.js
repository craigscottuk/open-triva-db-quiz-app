import { useEffect, useState } from 'react';
import he from 'he';

/**
  useFetchData is a custom hook that fetches the quiz data from opentdb.com/api
 **/

function useFetchData(amount, category, difficulty, isGameSet) {
  const [quizData, setQuizData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // URL search params are taken form the quiz config selects on at game start
    const params = new URLSearchParams({
      amount,
      category,
      difficulty,
      type: 'multiple',
    });
    setIsLoaded(false);
    setIsLoading(true);
    const url = `https://opentdb.com/api.php?${params.toString()}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setIsError(false);
        setQuizData(decodeData(data));
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLoaded(false);
        setIsError(true);
        console.log(err.message);
      });
  }, [isGameSet]);

  return { quizData, isLoading, isError, isLoaded };
}

/**
  decodeData function decodes any named and numerical HTML character references in the fetched data using the he encoder/decoder package
 **/

function decodeData(data) {
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
  return decodedData;
}

export default useFetchData;
