import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import { useNotify } from "../NotificationContext"

const AnecdoteForm = () => {
  // useQueryClient gives access to the central queryclient object responsible for performing fetches/caching/updating
  const queryClient = useQueryClient()

  const notify = useNotify()

  // TODO: create a mutation object that calls the function that would mutate server data
  const createNoteMutation = useMutation({
    // mutationFn attr passed to the mutation object, which is responsible for handling server updates
    mutationFn: addAnecdote,
    // Once the async mutationFn has resolved, the onSuccess: method is called 
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newNote))
      notify(`new note: '${newNote.content}' added`)
    },
    onError: (error) => {
      notify(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    // Event handler for the create anecdote button uses the mutation object.
    // Mutation calls the functions that handle server update, and waits for response before changing quieryClient state
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createNoteMutation.mutate({content, votes: 0, important: true})
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
