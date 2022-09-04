import { Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../data/Categories';
import ErrorMessage from '../error/ErrorMessage';
// import useFetchData from './components/useFetchData';

const Settings = ({ quizSettings }) => {
  const [numOfQues, setNumOfQues] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setdifficulty] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!numOfQues || !category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      navigate('/quiz');
      quizSettings(numOfQues, category, difficulty);
    }
  };

  return (
    <div className='settings-select'>
      {error && (
        <ErrorMessage>Please select a category and difficulty</ErrorMessage>
      )}
      <TextField
        select
        label='Select category'
        variant='outlined'
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        {Categories.map((category) => (
          <MenuItem key={category.category} value={category.value}>
            {category.category}
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
        label='Select number of questions'
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
        <MenuItem key='20' value='20'>
          20
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
  );
};

export default Settings;
