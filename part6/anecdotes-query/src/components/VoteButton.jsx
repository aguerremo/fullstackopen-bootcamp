import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { voteAnecdote } from '../requests/requests'
import { setNotification, useNotification } from '../context/NotificationContext'


const VoteButton = ({anecdote}) => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useNotification()

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(notificationDispatch, anecdote.content + ' voted succesfully!', 5)
      
    }
  })
  
  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })

  }
  
  return <button onClick={() => handleVote(anecdote)}>vote</button>
}

export default VoteButton