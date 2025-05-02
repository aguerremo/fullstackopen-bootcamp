import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createAnecdote } from '../requests/requests'
import { setNotification, useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const {notificationDispatch} = useNotification()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }
    )}
  })

  if(newAnecdoteMutation.length < 5){

    return <div>The anecdote need minimun 5 characthers</div>

  }
    const onCreate = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      setNotification(notificationDispatch, content + ' created succesfully!', 5)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
