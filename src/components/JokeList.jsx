import React from 'react';
import { Grid } from '@mui/material';
import JokeCard from './JokeCard';
// import { Joke } from '../types/joke';

const JokeList = ({ jokes, onDelete, onRefresh }) => {
  return (
    <Grid container spacing={2}>
      {jokes.map((joke) => (
           <Grid
          item
          key={joke.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3}}   
        >
        <JokeCard
          joke={joke}
          onDelete={onDelete}
          onRefresh={onRefresh}
        />
        </Grid>
      ))}
    </Grid>
  );
};

export default JokeList;
