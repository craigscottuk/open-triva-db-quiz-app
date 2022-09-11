import { React, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FadeWrapper, FadeTransition } from './components/FadeTransitionEffect';
import { Howl, Howler } from 'howler';
import useFetchData from './components/useFetchData';
import Spinner from './components/Spinner';
import Error from './components/Error';
import GameSettings from './components/GameSettings';
import GameStats from './components/GameStats';
import QuizItem from './components/QuizItem';
import EndScreen from './components/EndScreen';
import NewGameButton from './components/NewGameBtn';
import SoundEffectCorrect from './sounds/correct.mp3';
import SoundEffectIncorrect from './sounds/incorrect.mp3';
import SoundEffectGameOver from './sounds/gameOver.mp3';
import SoundEffectDisabledBtn from './sounds/disabled.mp3';
import Logo from './components/Logo';

const App = () => {
  // TAKES THE OPTIONS THE PLAYER CHOSE FROM THE QUIZ CONFIG SELECTS AMD SETS THE GAME SETTINGS STATE WITH THESE OPTIONS
  const quizSettings = (numOfQues, category, difficulty) => {
    setGameSettings({
      ...gameSettings,
      numOfQues: numOfQues,
      category: category,
      difficulty: difficulty,
      isGameSet: true,
    });
  };

  // GAME SETTINGS STATE THAT IS SET FROM QUIZ CONFIG SELECTS - NUMBER OF QUESTIONS, CATEGORY, DIFFICULTY
  const [gameSettings, setGameSettings] = useState({
    numOfQues: 1,
    category: 0,
    difficulty: '',
    isGameSet: false,
  });

  // THE GAME STATE - SCORE, QUESTION NUMBER AND IS GAME OVER?
  const [gameState, setGameState] = useState({
    score: 0,
    quizDataIndex: 0,
    isGameOver: false,
  });

  // CREATES A NEW QUIZ GAME
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

  const { score, quizDataIndex, isGameOver } = gameState;

  // FETCHES THE QUIZ DATA WITH THE CUSTOM HOOK useFetchData
  const { quizData, isLoading, isError, isLoaded } = useFetchData(
    gameSettings.numOfQues,
    gameSettings.category,
    gameSettings.difficulty,
    gameSettings.isGameSet
  );

  const { isGameSet, difficulty } = gameSettings;
  const { question, correct_answer, incorrect_answers } =
    quizData && quizData[quizDataIndex];

  // LOADS THE NEXT QUESTION OR SETS GAME STATE TO GAME OVER TRUE
  const loadNextQuestion = () => {
    if (quizDataIndex >= quizData.length - 1) {
      setGameState({
        ...gameState,
        isGameOver: true,
      });
    } else {
      setGameState({ ...gameState, quizDataIndex: quizDataIndex + 1 });
    }
  };

  // UPDATES GAME SCORE AND PLAYS THE SOUNDS FOR CORRECT/INCORRECT ANSWERS
  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      playSound([SoundEffectCorrect]);
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          score: score + 1,
        };
      });
    } else if (!wasPlayerCorrect) {
      playSound([SoundEffectIncorrect]);
    }
  };

  // PLAYS THE SOUND EFFECT FROM THE SOURCE
  const playSound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
    });
    sound.play();
  };

  // PLAYS THE DISABLED BUTTON SOUND AFTER ANSWER HAS ALREADY BEEN SELECTED
  const afterAnswerSelected = (areButtonsDisabled) => {
    if (areButtonsDisabled) {
      playSound([SoundEffectDisabledBtn]);
    }
  };

  // SETS THE SOUND VOLUME OF THE SOUND EFFECTS
  Howler.volume(0.5);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <GameSettings quizSettings={quizSettings} newGame={newGame} />
          }
        />
        <Route
          path='/quiz'
          element={
            <div className='app'>
              <header>
                {!isGameOver && (
                  <GameStats
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
                  <div className='new-game-screen'>
                    <Logo />
                    <Error error={isError}>
                      There was a problem fetchng the quiz data
                    </Error>
                    <NewGameButton newGame={newGame} />
                  </div>
                )}
                {!isGameSet && (
                  <div className='new-game-screen'>
                    <Logo />
                    <NewGameButton newGame={newGame} />
                  </div>
                )}
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
                            onNextBtnClick={loadNextQuestion}
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
                          {playSound([SoundEffectGameOver])}
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
