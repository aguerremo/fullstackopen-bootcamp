import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload

      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
  
})

export const initializeAnecdotes = () => {
return async dispatch => {
const anecdotes = await anecdoteService.getAll()
dispatch(setAnecdotes(anecdotes))
}
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdotes = (updatedAnecdote) => {
  return async dispatch => {
    const anecdoteVoted = await anecdoteService.voteAnecdote(updatedAnecdote.id, updatedAnecdote)
    dispatch(voteAnecdote(anecdoteVoted))
  }
}

export default anecdoteSlice.reducer
export const {createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions