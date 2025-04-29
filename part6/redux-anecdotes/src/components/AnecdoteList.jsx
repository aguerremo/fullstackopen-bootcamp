import { useSelector } from "react-redux"
import VoteButton from "./VoteButton"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    }
    return state.filter  === 'ALL' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })
  
    return <div>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
            {anecdote.content} has {anecdote.votes} <VoteButton anecdote={anecdote}/>
        </div>
      )}
    </div>
}

export default AnecdoteList