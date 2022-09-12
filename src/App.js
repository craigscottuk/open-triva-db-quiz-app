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
import SoundEffectCorrect from './sounds/Correct.mp3';
import SoundEffectIncorrect from './sounds/Incorrect.mp3';
import SoundEffectDisabledBtn from './sounds/Disabled.mp3';
import Logo from './components/Logo';

const App = () => {
  // Pulls the options the player chose from the select inputs at startup and sets the game settings state the player's custom options
  const quizSettings = (numOfQues, category, difficulty) => {
    setGameSettings({
      ...gameSettings,
      numOfQues: numOfQues,
      category: category,
      difficulty: difficulty,
      isGameSet: true,
    });
  };

  // GameSettings state holds the quiz config from startup
  const [gameSettings, setGameSettings] = useState({
    numOfQues: 1,
    category: 0,
    difficulty: '',
    isGameSet: false,
  });

  // GameState keeps track of the player's score, the question number and when the game is over
  const [gameState, setGameState] = useState({
    score: 0,
    quizDataIndex: 0,
    isGameOver: false,
  });

  // Creates a new quiz game or is run to restart the game
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

  // Fetches the quiz data with using custom hook useFetchData. Data from the gameSettings state is fed into it to query opentdb.com
  const { quizData, isLoading, isError, isLoaded } = useFetchData(
    gameSettings.numOfQues,
    gameSettings.category,
    gameSettings.difficulty,
    gameSettings.isGameSet
  );

  const { isGameSet, difficulty } = gameSettings;
  const { question, correct_answer, incorrect_answers } =
    quizData && quizData[quizDataIndex];

  // Loads the next game question or ends the game (gameState.isGameOver: true) if all questions have already been answered
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

  // Updates the player's score and plays the sounds for correct or incorrect answers when the player selects an answer
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

  // PlaySound takes the mp3 file source and plays the relevant sound effect
  const playSound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
    });
    sound.play();
  };

  // Plays the disabled button sound if player continues to press the the answer buttons after an answer has already been selected
  const afterAnswerSelected = (areButtonsDisabled) => {
    if (areButtonsDisabled) {
      playSound([SoundEffectDisabledBtn]);
    }
  };

  // Howler.volume() sets the loudness of the sound effects globally
  Howler.volume(0.5);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <GameSettings
                quizSettings={quizSettings}
                newGame={newGame}
                playSound={playSound}
              />
            </>
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
