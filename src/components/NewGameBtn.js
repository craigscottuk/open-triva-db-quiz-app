import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, createTheme, ThemeProvider } from '@mui/material';

const NewGameButton = ({ newGame }) => {
  // React Router navigate hook to navigate player to the quiz start page (./)
  const navigate = useNavigate();

  // // MUI theme for the NEW GAME button
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
