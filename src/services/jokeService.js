// services/jokeService.ts
// import { Joke } from "../types/joke";

const BASE_URL = 'https://official-joke-api.appspot.com'

export const getTenJokes = async () => {
  const res = await fetch(`${BASE_URL}/jokes/ten`)
  return res.json()
}

export const getRandomJoke = async () => {
  const res = await fetch(`${BASE_URL}/jokes/random`)
  return res.json()
}
