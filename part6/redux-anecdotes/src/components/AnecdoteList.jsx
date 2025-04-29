import { useSelector } from "react-redux"
import VoteButton from "./VoteButton"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

 const filteredAnecdotes = filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
    return <div>
      {filteredAnecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
            {anecdote.content} has {anecdote.votes} <VoteButton anecdote={anecdote}/>
        </div>
      )}
    </div>
}

export default AnecdoteList