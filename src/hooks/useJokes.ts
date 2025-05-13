// hooks/useJokes.ts
import { useEffect, useState } from "react";
import { Joke } from "../types/joke";
import { getRandomJoke, getTenJokes } from "../services/jokeService.js";
import { getUserJokes, saveUserJokes } from "../utils/storage";

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

  const getUniqueJokes = (jokeArr: Joke[], count: number): Joke[] => {
    const map = new Map<number, Joke>();
    for (let joke of jokeArr) {
      map.set(joke.id, joke);
      if (map.size >= count) break;
    }
    return Array.from(map.values());
  };

  const loadMore = async () => {
    const existingIds = new Set(jokes.map(j => j.id));
    const result: Joke[] = [...jokes];

    while (result.length < jokes.length + 10) {
      const newBatch = await getTenJokes();
      const unique = newBatch.filter(joke => !existingIds.has(joke.id));
      unique.forEach(joke => {
        existingIds.add(joke.id);
        result.push(joke);
      });
    }

    setJokes(result);
  };

  const addJoke = async () => {
    const newJoke = await getRandomJoke();
    const updated = [newJoke, ...jokes];
    saveUserJokes([newJoke, ...getUserJokes()]);
    setJokes(updated);
  };

  const deleteJoke = (id: number) => {
    const updated = jokes.filter(joke => joke.id !== id);
    saveUserJokes(getUserJokes().filter(joke => joke.id !== id));
    setJokes(updated);
  };

  const refreshJoke = async (id: number) => {
    const newJoke = await getRandomJoke();
    const updated = jokes.map(joke => (joke.id === id ? newJoke : joke));
    setJokes(updated);
  };

  return { jokes, loadMore, addJoke, deleteJoke, refreshJoke };
};
