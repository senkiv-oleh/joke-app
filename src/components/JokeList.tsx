import React from 'react';
import { Grid } from '@mui/material';
import JokeCard from './JokeCard';
import { Joke } from '../types/joke';
import { JokeProps } from '../types/controls';

type JokeListProps = JokeProps & { jokes: Joke[] };

const JokeList: React.FC<JokeListProps> = ({ jokes, onDelete, onRefresh }) => {
  return (
    <Grid container spacing={2} style={{ marginBottom: '40px' }}>
      {jokes.map((joke: Joke) => (
        <Grid key={joke.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <JokeCard joke={joke} onDelete={onDelete} onRefresh={onRefresh} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JokeList;
