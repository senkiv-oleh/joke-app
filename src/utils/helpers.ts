import { Joke } from "../types/joke";

export const getUniqueJokes = (jokes: Joke[], count: number): Joke[] => {
  const map = new Map<number, Joke>();
  for (let joke of jokes) {
    map.set(joke.id, joke);
    if (map.size >= count) break;
  }
  return Array.from(map.values());
};
