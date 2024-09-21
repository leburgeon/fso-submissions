import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, voteForAnecdote } from './requests'
import { useNotify } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  // Defines the query, which is a 
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  // We could utilise 
  const anecdoteVoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id
        ? anecdote
        : updatedAnecdote
      ))
      notify(`Voted for '${updatedAnecdote.content}'`)
    }
  })

  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate(anecdote)
  }

  if (result.isLoading){
    return <div>Loading anecdotes...</div>
  }

  if (result.isError){
    return <div>problem: {result.error.message}</div>
  }

  // If the result is not loading, and is not error, the data has been fetched and so is accessable
  const anecdotes = result.data.toSorted((a,b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
