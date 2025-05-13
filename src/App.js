import React, { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import JokeList from './components/JokeList'
import Controls from './components/Controls'
import { replaceUserJoke } from './utils/storage'
import { getRandomJoke, getTenJokes } from './services/jokeService.js'
import './App.css'

function removeStoredJoke (id) {
  throw new Error('Function not implemented.')
}

function storeJoke (newJoke) {
  throw new Error('Function not implemented.')
}

function App () {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    const loadInitialJokes = async () => {
      const saved = getTenJokes()
      const fetched = await getTenJokes()
      const merged = [
        ...(await saved),
        ...fetched.filter(async j => !(await saved).find(s => s.id === j.id))
      ].slice(0, 10)
      setJokes(merged)
    }
    loadInitialJokes()
  }, [])

  const handleDelete = id => {
    setJokes(prev => prev.filter(j => j.id !== id))
    removeStoredJoke(id)
  }

  const handleRefresh = async id => {
    const newJoke = await getRandomJoke()
    setJokes(prev => prev.map(j => (j.id === id ? newJoke : j)))

    const saved = getTenJokes()
    const existsInStorage = (await saved).some(j => j.id === id)
    if (existsInStorage) {
      replaceUserJoke(id, newJoke)
    }
  }

  const handleLoadMore = async () => {
    const newJokes = []
    while (newJokes.length < 10) {
      const batch = await getTenJokes()
      const unique = batch.filter(
        j => ![...jokes, ...newJokes].some(existing => existing.id === j.id)
      )
      newJokes.push(...unique)
    }
    setJokes(prev => [...prev, ...newJokes.slice(0, 10)])
  }

  const handleAdd = async () => {
    const newJoke = await getRandomJoke()
    if (!jokes.find(j => j.id === newJoke.id)) {
      setJokes(prev => [newJoke, ...prev])
      storeJoke(newJoke)
    }
  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' align='center' gutterBottom>
        Joke LIST
      </Typography>
      <p>This is a simple React application.</p>
      <JokeList
        jokes={jokes}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
      />{' '}
      <Controls onLoadMore={handleLoadMore} onAdd={handleAdd} />
    </Container>
    // <div className='App'>
    //   <header className='App-header'>
    //     <img src={logo} className='App-logo' alt='logo' />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className='App-link'
    //       href='https://reactjs.org'
    //       target='_blank'
    //       rel='noopener noreferrer'
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App
