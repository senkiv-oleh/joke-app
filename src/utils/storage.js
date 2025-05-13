// import { Joke } from "../types/joke";

const STORAGE_KEY = 'user_jokes'

export const getUserJokes = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveUserJokes = jokes => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes))
}

export const addUserJoke = joke => {
  const current = getUserJokes()
  const isDuplicate = current.some(j => j.id === joke.id)
  if (!isDuplicate) {
    saveUserJokes([joke, ...current])
  }
}

export const removeUserJoke = id => {
  const current = getUserJokes().filter(j => j.id !== id)
  saveUserJokes(current)
}

export const replaceUserJoke = (id, newJoke) => {
  const current = getUserJokes().map(j => (j.id === id ? newJoke : j))
  saveUserJokes(current)
}
