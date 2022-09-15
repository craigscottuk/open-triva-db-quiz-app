import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Logo from './Logo';
import Categories from './Categories';
import SoundEffectgameStart from '../sounds/GameStart.mp3';
import SoundEffectDisabledBtn from '../sounds/Disabled.mp3';
import {
  Button,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useEffect } from 'react';

const Settings = ({ quizSettings, newGame, playSound }) => {
  const [numOfQues, setNumOfQues] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setdifficulty] = useState('');
  const [isValidationError, setIsValidationError] = useState(false);
  // React Router navigate hook to navigate player to the quiz (./quiz)
  const navigate = useNavigate();

  // Checks player has set up the game and navigates to the quiz (./quiz)
  const handleSubmit = () => {
    if (!numOfQues || !category || !difficulty) {
      setIsValidationError(true);
      playSound([SoundEffectDisabledBtn]);
    } else {
      setIsValidationError(false);
      newGame();
      quizSettings(numOfQues, category, difficulty);
      navigate('/quiz');
    }
  };

  // MUI theme for form inputs and button
  const customMuiTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#E5C01A',
        dark: '#E09006',
      },
    },
  });

  // Plays the game intro sound effct on first render
  useEffect(() => {
    playSound([SoundEffectgameStart]);
    newGame();
  }, []);

  return (
    <ThemeProvider theme={customMuiTheme}>
      <div className='app'>
        <div className='bounce-in-animation'>
          <Logo />
        </div>
        <div className='settings-selects'>
          <div
            style={{
              visibility: isValidationError ? 'visible' : 'hidden',
              marginBottom: '0.2rem',
            }}
          >
            <Error isValidationError={isValidationError}>
              Please set up your game using the options below
            </Error>
          </div>
          <TextField
            select
            label='Select category'
            variant='outlined'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((category) => (
              <MenuItem key={category.name} value={category.value}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label='Select difficulty'
            variant='outlined'
            onChange={(e) => setdifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key='Easy' value='easy'>
              Easy
            </MenuItem>
            <MenuItem key='Medium' value='medium'>
              Medium
            </MenuItem>
            <MenuItem key='Hard' value='hard'>
              Hard
            </MenuItem>
          </TextField>
          <TextField
            select
            label='Select amount of questions'
            variant='outlined'
            onChange={(e) => setNumOfQues(e.target.value)}
            value={numOfQues}
          >
            <MenuItem key='5' value='5'>
              5
            </MenuItem>
            <MenuItem key='10' value='10'>
              10
            </MenuItem>
            <MenuItem key='15' value='15'>
              15
            </MenuItem>
          </TextField>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Settings;
