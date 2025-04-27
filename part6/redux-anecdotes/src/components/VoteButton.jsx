import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"


const VoteButton = ({anecdote}) => {

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))

  }

  return <button onClick={() => vote(anecdote.id)}>vote</button>
        
}

export default VoteButton