import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Logo from './Logo';
import Categories from './Categories';
import {
  Button,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@mui/material';

const Settings = ({ quizSettings, newGame }) => {
  const [numOfQues, setNumOfQues] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setdifficulty] = useState('');
  const [error, setError] = useState(false);
  // REACT ROUTER DOM NAVIGATION
  const navigate = useNavigate();

  // FORM VALIDATION - NAVIGATES TO THE QUIZ AND STARTS NEW GAME
  const handleSubmit = () => {
    if (!numOfQues || !category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      newGame();
      quizSettings(numOfQues, category, difficulty);
      navigate('/quiz');
    }
  };

  // MUI THEME FOR FORM INPUTS AND BUTTON
  const customMuiTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#E5C01A',
        dark: '#E09006',
      },
    },
  });

  return (
    <ThemeProvider theme={customMuiTheme}>
      <div className='app'>
        <Logo />
        <div className='settings-selects'>
          <div
            style={{
              visibility: error ? 'visible' : 'hidden',
              marginBottom: '0.1rem',
            }}
          >
            <Error>Please set the quiz using the options below</Error>
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
