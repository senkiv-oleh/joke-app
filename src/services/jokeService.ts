import {
  API_URL,
  RANDOM_JOKE_ENDPOINT,
  RANDOM_TEN_JOKES_URL
} from "../constants/urls";

export const getRandomJoke = async () => {
  const res = await fetch(`${API_URL}${RANDOM_JOKE_ENDPOINT}`);
  return res.json();
};

export const getTenJokes = async () => {
  const res = await fetch(`${API_URL}${RANDOM_TEN_JOKES_URL}`);
  return res.json();
};
