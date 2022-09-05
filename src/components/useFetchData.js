import { useEffect, useState } from 'react';
import he from 'he';

function useFetchData(amount, category, difficulty, isGameSet) {
  const [quizData, setQuizData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //  Fetches quiz data from opentdb.com/api

  useEffect(() => {
    const params = new URLSearchParams({ amount, category, type: 'multiple' });
    if (difficulty !== '') params.append('difficulty', difficulty);
    if (isGameSet === true) {
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
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(true);
          console.log(err.message);
        });
    }
  }, [amount, category, difficulty, isGameSet]);

  return { quizData, isLoading, isError };
}

// decodeData function decodes any named and numerical HTML character references in the fetched data using the he encoder/decoder
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
