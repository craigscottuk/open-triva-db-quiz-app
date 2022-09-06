import { React, useState } from 'react';
import './App.css';
import useFetchData from './data/useFetchData';
import Loader from './components/Loader';
import Error from './components/Error';
import Stats from './components/Stats';
import QuizItem from './components/QuizItem';
import EndScreen from './components/EndScreen';
import { FadeWrapper, FadeTransition } from './components/fadeTransition';
import { Howl, Howler } from 'howler';
import Correct_WAV from './sounds/correct_24.wav';
import Incorrect_WAV from './sounds/incorrect_15.wav';
import Click_WAV from './sounds/click_11.wav';
import EndGame_WAV from './sounds/quiz_end_screen_01.wav';
import Correct_MP3 from './sounds/correct_24.mp3';
import Incorrect_MP3 from './sounds/incorrect_15.mp3';
import EndGame_MP3 from './sounds/quiz_end_screen_01.mp3';
import Click_MP3 from './sounds/click_11.mp3';

import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewGame from './components/NewGame';

const App = () => {
  // GAME SETTINGS

  const [gameSettings, setGameSettings] = useState({
    numOfQues: 2,
    category: 22,
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

  console.log(gameSettings);

  //FETCH DATA

  // useFetchData is a custom hook that fetches the quiz data
  const { quizData, isLoading, isError } = useFetchData(
    gameSettings.numOfQues,
    gameSettings.category,
    gameSettings.difficulty,
    gameSettings.isGameSet
  );

  // GAME STATE

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

  // LOAD NEXT PAGE

  // LoadNextPage function uses spread operator to copy the gameState
  // and adds 1 to quizDataIndex thus moving to the next question
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

  const { isGameSet } = gameSettings;
  const { score, quizDataIndex, isGameOver } = gameState;
  const { question, correct_answer, incorrect_answers } =
    quizData && quizData[quizDataIndex];

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Settings quizSettings={quizSettings} />} />
        <Route
          path='/quiz'
          element={
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
                {!isGameSet && <NewGame />}
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
                            bestScore={0}
                            onRetryBtnClick={restartGame}
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
