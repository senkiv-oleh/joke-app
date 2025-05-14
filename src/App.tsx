import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import JokeList from "./components/JokeList";
import Controls from "./components/Controls";
import { replaceUserJoke } from "./utils/storage";
import { getRandomJoke, getTenJokes } from "./services/jokeService";
import { Joke } from "./types/joke";

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const loadInitialJokes = async () => {
      const saved = await getTenJokes();
      const fetched = await getTenJokes();
      const merged = [
        ...saved,
        ...fetched.filter((j: Joke) => !saved.find((s: Joke) => s.id === j.id))
      ].slice(0, 10);
      setJokes(merged);
    };
    loadInitialJokes();
  }, []);

  const handleDelete = (id: number) => {
    setJokes(prev => prev.filter((j: Joke) => j.id !== id));
    console.log("Deleting joke with ID:", id);
  };

  const handleRefresh = async (id: number) => {
    const newJoke = await getRandomJoke();
    setJokes(prev => prev.map(j => (j.id === id ? newJoke : j)));

    const saved = await getTenJokes();
    const existsInStorage = saved.some((j: Joke) => j.id === id);
    if (existsInStorage) {
      replaceUserJoke(id, newJoke);
    }
  };

  const handleLoadMore = async () => {
    const newJokes: Joke[] = [];
    while (newJokes.length < 10) {
      const batch = await getTenJokes();
      const unique: Joke[] = batch.filter(
        (j: Joke) =>
          ![...jokes, ...newJokes].some(existing => existing.id === j.id)
      );
      newJokes.push(...unique);
    }
    setJokes(prev => [...prev, ...newJokes.slice(0, 10)]);
  };

  const handleAdd = async () => {
    const newJoke = await getRandomJoke();
    if (!jokes.find(j => j.id === newJoke.id)) {
      setJokes(prev => [newJoke, ...prev]);
    }
  };

  return (
    <Container maxWidth="lg" style={{ boxSizing: "border-box" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ margin: 30, fontWeight: "bold" }}
      >
        Joke LIST
      </Typography>
      <Controls onLoadMore={handleLoadMore} onAdd={handleAdd} />
      <JokeList
        jokes={jokes}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default App;
