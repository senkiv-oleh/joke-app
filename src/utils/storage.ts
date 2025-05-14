import { Joke } from "../types/joke";

const STORAGE_KEY = "user_jokes";

export const getUserJokes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUserJokes = (jokes: Joke[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
};

export const addUserJoke = (joke: Joke) => {
  const current = getUserJokes();
  const isDuplicate = current.some((j: Joke) => j.id === joke.id);
  if (!isDuplicate) {
    saveUserJokes([joke, ...current]);
  }
};

export const removeUserJoke = (id: number) => {
  const current = getUserJokes().filter((j: Joke) => j.id !== id);
  saveUserJokes(current);
};

export const replaceUserJoke = (id: number, newJoke: Joke) => {
  const current = getUserJokes().map((j: Joke) => (j.id === id ? newJoke : j));
  saveUserJokes(current);
};
