import VoteButton from "./VoteButton"
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests/requests'

const AnecdoteList = () => {

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdote service is not available due to problems in server</span>
  }
  

  const anecdotes = result.data

  return  <div>
  {anecdotes.map(anecdote =>
    <div key={anecdote.id}>
        
        {anecdote.content} has {anecdote.votes} <VoteButton anecdote={anecdote} />
    </div> 
  )}

  </div>
}

export default AnecdoteList