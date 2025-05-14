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
    const result: Joke[] = [...jokes];

    while (result.length < jokes.length + 10) {
      const newBatch = await getTenJokes();
      const unique = newBatch.filter((joke: Joke) => !existingIds.has(joke.id));
      unique.forEach((joke: Joke) => {
        existingIds.add(joke.id);
        result.push(joke);
      });
    }

    setJokes(result);
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
