import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { amber } from '@mui/material/colors';

const NewGameButton = ({ newGame }) => {
  const quizThemeMUI = createTheme({
    palette: {
      mode: 'dark',
      primary: amber,
    },
  });
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={quizThemeMUI}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'center',
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
