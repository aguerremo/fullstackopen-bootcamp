import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { voteAnecdote } from '../requests/requests'

const VoteButton = ({anecdote}) => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })

  }
  
  return <button onClick={() => handleVote(anecdote)}>vote</button>
}

export default VoteButton