import { Joke } from '../types/joke';
import { STORAGE_KEY } from '../constants/constants';

const getStoredJokes = (): Joke[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setStoredJokes = (jokes: Joke[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
};

export const getUserJokes = getStoredJokes;

export const addUserJoke = (joke: Joke) => {
  const current = getStoredJokes();
  const isDuplicate = current.some(j => j.id === joke.id);
  if (!isDuplicate) {
    setStoredJokes([joke, ...current]);
  }
};

export const removeUserJoke = (id: number) => {
  const filtered = getStoredJokes().filter(j => j.id !== id);
  setStoredJokes(filtered);
};

export const replaceUserJoke = (id: number, newJoke: Joke) => {
  const updated = getStoredJokes().map(j => (j.id === id ? newJoke : j));
  setStoredJokes(updated);
};

export const isUserJoke = (id: number): boolean => {
  return getStoredJokes().some(j => j.id === id);
};
