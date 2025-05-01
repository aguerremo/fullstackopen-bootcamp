import { useDispatch } from "react-redux"
import { voteAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const VoteButton = ({anecdote}) => {

  const dispatch = useDispatch()

  const vote = () => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch(voteAnecdotes(updatedAnecdote))
    dispatch(setNotification(anecdote.content + ' voted succesfully', 3))
  }

  return <button onClick={vote}>vote</button>
        
}

export default VoteButton