import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'
import { createNew } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNew(content))
  }

  return (
    <form onSubmit={newAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
  )
}

export default AnecdoteForm