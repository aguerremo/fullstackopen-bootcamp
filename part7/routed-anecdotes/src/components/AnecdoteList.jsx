import { Link } from "react-router-dom"
import Notifications from './Notifications'

const AnecdoteList = ({ anecdotes , notification}) => {

  return <div>
    <h2>Anecdotes</h2>
    <Notifications notification={notification} />

    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
        </Link>
        </li>)}
    </ul>
  </div>
  
      }

export default AnecdoteList