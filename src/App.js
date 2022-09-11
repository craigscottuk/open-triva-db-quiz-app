import { React, useState } from 'react';
import './App.css';
import useFetchData from './data/useFetchData';
import Spinner from './components/Spinner';
import Error from './components/Error';
import Stats from './components/StatsHeader';
import QuizItem from './components/QuizItem';
import EndScreen from './components/EndScreen';
import { FadeWrapper, FadeTransition } from './components/FadeTransition';
import { Howl, Howler } from 'howler';
import Correct_WAV from './sounds/correct_24.wav';
import Incorrect_WAV from './sounds/incorrect_15.wav';
import Click_WAV from './sounds/click_11.wav';
import EndGame_WAV from './sounds/quiz_end_screen_01.wav';
import Correct_MP3 from './sounds/correct_24.mp3';
import Incorrect_MP3 from './sounds/incorrect_15.mp3';
import EndGame_MP3 from './sounds/quiz_end_screen_01.mp3';
import Click_MP3 from './sounds/click_11.mp3';

import Settings from './components/GameSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewGameButton from './components/NewGameBtn';

const App = () => {
  // GAME SETTINGS

  const [gameSettings, setGameSettings] = useState({
    numOfQues: 1,
    category: 0,
    difficulty: '',
    isGameSet: false,
  });
  const quizSettings = (numOfQues, category, difficulty) => {
    setGameSettings({
      ...gameSettings,
      numOfQues: numOfQues,
      category: category,
      difficulty: difficulty,
      isGameSet: true,
    });
  };

  console.log(gameSettings.isGameSet);

  // GAME STATE

  const [gameState, setGameState] = useState({
    score: 0,
    quizDataIndex: 0,
    isGameOver: false,
  });

  //NEW GAME///
  const newGame = () => {
    setGameState({
      score: 0,
      quizDataIndex: 0,
      isGameOver: false,
    });
    setGameSettings({
      ...gameSettings,
      isGameSet: false,
    });
  };

  //FETCH DATA

  // useFetchData is a custom hook that fetches the quiz data
  const { quizData, isLoading, isError, isLoaded } = useFetchData(
    gameSettings.numOfQues,
    gameSettings.category,
    gameSettings.difficulty,
    gameSettings.isGameSet
  );

  // LOAD NEXT PAGE
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

  // SOUNDS AND SCORE

  const playSound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
    });
    sound.play();
  };

  Howler.volume(0);

  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      playSound([Correct_MP3, Correct_WAV]);
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          score: score + 1,
        };
      });
    } else if (!wasPlayerCorrect) {
      playSound([Incorrect_MP3, Incorrect_WAV]);
    }
  };

  const afterAnswerSelected = (areButtonsDisabled) => {
    if (areButtonsDisabled) {
      playSound([Click_MP3, Click_WAV]);
    }
  };

  const { isGameSet, difficulty } = gameSettings;
  const { score, quizDataIndex, isGameOver } = gameState;
  const { question, correct_answer, incorrect_answers } =
    quizData && quizData[quizDataIndex];

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Settings quizSettings={quizSettings} newGame={newGame} />}
        />
        <Route
          path='/quiz'
          element={
            <div className='app'>
              <header>
                {!isGameOver && (
                  <Stats
                    score={score}
                    questionNum={quizDataIndex}
                    isGameOver={isGameOver}
                    totalNumOfQuestions={quizData.length}
                    isLoaded={isLoaded}
                    questionItem={quizData[quizDataIndex]}
                    difficulty={difficulty}
                    isGameSet={isGameSet}
                  />
                )}
              </header>
              <main>
                {isError && (
                  <>
                    <Error error={isError}>
                      There was a problem fetchng the quiz data
                    </Error>
                    <NewGameButton newGame={newGame} />
                  </>
                )}
                {!isGameSet && <NewGameButton newGame={newGame} />}
                {isLoading && isGameSet && <Spinner isLoading={isLoading} />}
                {isLoaded && isGameSet && (
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
                            afterAnswerSelected={afterAnswerSelected}
                          />
                        </FadeTransition>
                      </FadeWrapper>
                    ) : (
                      <FadeWrapper>
                        <FadeTransition>
                          <EndScreen
                            key={'EndScreen'}
                            score={score}
                            totalNumOfQuestions={quizData.length}
                            newGame={newGame}
                          />
                          {playSound([EndGame_MP3, EndGame_WAV])}
                        </FadeTransition>
                      </FadeWrapper>
                    )}
                  </>
                )}
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
