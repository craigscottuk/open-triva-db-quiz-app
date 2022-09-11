import { React } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

const NextButton = ({ onNextBtnClick, hasUserSelectedAnswer }) => {
  const nextBtnMuiTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#171717',
        dark: '#000000',
      },
    },
  });
  return (
    <ThemeProvider theme={nextBtnMuiTheme}>
      <div>
        <Button
          onClick={onNextBtnClick}
          disabled={!hasUserSelectedAnswer}
          style={{ marginTop: '0.8rem', width: '100%' }}
          variant='contained'
          color='primary'
          size='large'
          disableElevation
        >
          Next
        </Button>
        ;
      </div>
    </ThemeProvider>
  );
};

export default NextButton;
