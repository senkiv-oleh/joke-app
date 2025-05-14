import { useEffect, useState } from "react";
import { Joke } from "../types/joke";
import { getRandomJoke, getTenJokes } from "../services/jokeService";
import {
  getUserJokes,
  addUserJoke,
  removeUserJoke,
  replaceUserJoke,
  isUserJoke
} from "../utils/storage";
import { getUniqueJokes } from "../utils/helpers";
import { TEN_RANDOM_JOKES } from "../constants/constants";

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const loadInitial = async () => {
      const userJokes = getUserJokes();
      const fetched = await getTenJokes();
      const unique = getUniqueJokes([...userJokes, ...fetched], 10);
      setJokes(unique);
    };

    loadInitial();
  }, []);

  const handleLoadMore = async () => {
    const existingIds = new Set(jokes.map(j => j.id));
    const result: Joke[] = [];

    while (result.length < TEN_RANDOM_JOKES) {
      const newBatch = await getTenJokes();

      const unique = newBatch.filter(
        (joke: Joke) =>
          !existingIds.has(joke.id) && !result.some(j => j.id === joke.id)
      );

      result.push(...unique.slice(0, TEN_RANDOM_JOKES - result.length));
      unique.forEach((j: Joke) => existingIds.add(j.id));

      if (newBatch.length === 0 || unique.length === 0) break;
    }
    setJokes(prev => [...prev, ...result]);
  };

  const handleAdd = async () => {
    const newJoke = await getRandomJoke();
    addUserJoke(newJoke);
    setJokes(prev => [...prev, newJoke]);
  };

  const handleDelete = (id: number) => {
    removeUserJoke(id);
    setJokes(prev => prev.filter(j => j.id !== id));
  };

  const handleRefresh = async (id: number) => {
    const newJoke = await getRandomJoke();
    setJokes(prev => prev.map(j => (j.id === id ? newJoke : j)));
    if (isUserJoke(id)) {
      replaceUserJoke(id, newJoke);
    }
  };

  return { jokes, handleLoadMore, handleAdd, handleDelete, handleRefresh };
};
