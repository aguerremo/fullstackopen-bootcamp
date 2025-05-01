import axios from 'axios'

const baserUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baserUrl).then(res => res.data)

export const createAnecdote = newAnecdote => axios.post(baserUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = votedAnecdote => axios.put(`${baserUrl}/${votedAnecdote.id}`, votedAnecdote).then(res => res.data)


