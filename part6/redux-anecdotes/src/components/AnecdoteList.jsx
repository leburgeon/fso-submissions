import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <li>
        {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const filtered = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    return filtered.toSorted((a, b) => 
      b.votes - a.votes)
  })

  return (
    <ul>
      {anecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteFor(anecdote.id))}
          />
      )}
    </ul>
  )
}

export default AnecdoteList