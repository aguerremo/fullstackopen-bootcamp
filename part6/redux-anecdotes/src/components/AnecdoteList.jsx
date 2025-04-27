import { useSelector } from "react-redux"
import VoteButton from "./VoteButton"

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
  
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