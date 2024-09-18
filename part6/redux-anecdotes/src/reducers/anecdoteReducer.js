import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Returns a copy of the state, but with the anecdotes attribute array updated
//     case 'INCREMENT_VOTE_COUNT':
//       return state.map(anecdote => 
//           // If the id is equal to the id in the payload, the anecotes vote count is incremented
//           action.payload.id !== anecdote.id? anecdote :
//           {...anecdote, votes: (anecdote.votes + 1)}
//         )
      
//     case 'NEW_ANECDOTE':
//       return  [...state, 
//           asObject(action.payload.content)]
      
//   }
//   return state
// }

// export const voteFor = (id) => {
//   return {
//     type: 'INCREMENT_VOTE_COUNT',
//     payload: {id}
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {content}
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    voteFor(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload
        ? anecdote 
        : {...anecdote, votes: anecdote.votes +1}
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})



export const { createAnecdote, voteFor, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

// Method returns a thunk function, which dispatches an action to the store after an asynchronous operation
export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer