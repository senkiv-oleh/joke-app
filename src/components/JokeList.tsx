import React from "react";
import { Grid } from "@mui/material";
import JokeCard from "./JokeCard";
import { Joke } from "../types/joke";

interface JokeListProps {
  jokes: Joke[];
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
}

const JokeList: React.FC<JokeListProps> = ({ jokes, onDelete, onRefresh }) => {
  return (
    <Grid container spacing={1}>
      {jokes.map(joke =>
        <Grid key={joke.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <JokeCard joke={joke} onDelete={onDelete} onRefresh={onRefresh} />
        </Grid>
      )}
    </Grid>
  );
};

export default JokeList;
