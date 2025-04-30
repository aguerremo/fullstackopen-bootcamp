import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const VoteButton = ({anecdote}) => {

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(anecdote.content + ' voted succesfully', 3))
  }

  return <button onClick={() => vote(anecdote.id)}>vote</button>
        
}

export default VoteButton