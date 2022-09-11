import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, createTheme, ThemeProvider } from '@mui/material';

const NewGameButton = ({ newGame }) => {
  // REACT ROUTER DOM NAVIGATION
  const navigate = useNavigate();

  // MUI THEME FOR THE NEW GAME BUTTON
  const quizThemeMUI = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#E5C01A',
        dark: '#E09006',
      },
    },
  });

  return (
    <ThemeProvider theme={quizThemeMUI}>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'top',
          marginTop: '1.1rem',
        }}
      >
        <Button
          onClick={() => {
            navigate('/');
            newGame();
          }}
          variant='contained'
          color='primary'
          size='large'
        >
          New Game
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default NewGameButton;
