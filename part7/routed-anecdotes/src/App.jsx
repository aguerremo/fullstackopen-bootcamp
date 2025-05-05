import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')


  const padding = {
    paddingRight: 5
  }
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
<div>
<h1>Software anecdotes</h1>

<Router>
  <div>
    <Link style={padding} to="/">anecdotes</Link>
    <Link style={padding} to="/new">create new</Link>
    <Link style={padding} to="/about">about</Link>
  </div>

  <Routes>
    <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
    <Route path="/new" element={ <CreateNew addNew={addNew} setNotification={setNotification} />} />
    <Route path="/users" element={<About />} />
    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
  </Routes>

  <div>
    <br />
  <Footer />
</div>
</Router>
</div>
    
  )
}

export default App
