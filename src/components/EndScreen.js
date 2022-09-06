import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { amber } from '@mui/material/colors';

/**
 * EndScreen renders the final game state - the final score, a trophey and a retry button.
 * @param {object} props
 * @param {number} props.score
 * @param {onClick} props.onRetryBtnClick
 */

const EndScreen = ({ score }) => {
  const quizThemeMUI = createTheme({
    palette: {
      mode: 'dark',
      primary: amber,
    },
  });

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={quizThemeMUI}>
      <div className='end-screen'>
        <p className='quiz-complete'>Quiz complete!</p>
        <div style={{ fontSize: '6.5rem' }}>🏆</div>
        <div className='game-stats'>
          <ul style={{ margin: '1rem 0' }}>
            <li className='sans-stat-title' style={{ fontSize: '2rem' }}>
              Score:
            </li>
            <li className='sans-stat-value' style={{ fontSize: '4rem' }}>
              {score}
            </li>
          </ul>
        </div>
        <div className='review-restart'>
          <Button
            onClick={() => {
              navigate('/');
            }}
            variant='contained'
            color='primary'
            size='large'
          >
            New Game
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EndScreen;
