import { createSlice, current } from "@reduxjs/toolkit"

import getAll from '../services/notes'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  }
]

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

// // With the legacy method of creating a note-reducer and specifying action-types,
// // there uis much boilerplate code. This includes writing action creators and cases for action types
// const noteReducer = (state = initialState, action) => {
//   if (action.type === 'NEW_NOTE'){
//     // as concat returns a copy of the array, and does not modify the original, this reducer function remains 'pure'
//     return [...state, action.payload]
//   } else if (action.type === 'TOGGLE_IMPORTANCE'){
//     return state.map(note => note.id === action.payload.id ? 
//       {...note, 
//         important : (!note.important)} 
//       : note
//     )
//   }
//   return state
// }

// // Action creators:
// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }
// // --
// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: {
//       id
//     }
//   }
// }

// New redux-toolkit uses createSlice(), which takes an object with attrs as the slice options,
// this includes a reducer object with functions as the reducer actions
// inclds an initialState attribute which is used instead of using a default value for state in the reducer function

const noteSlice = createSlice({
  name: 'notes',

  // The issue with using an asynchronous method call within the slice creator, is that the entire store is then waiting for the promise to resolve
  // This is okay with quick fetches from a local server, but requests that take longer will block the rest of the application
  // initialState: await getAll(),

  initialState: [],
  reducers: {
    // this declares a function attribute using concise method syntax
    // the action type is generated using the method name and actions with that type will be passed to the reducer
    createNote(state, action) {
      state.push(action.payload)
    },
    // another reducer action called with the aciton type 'toggleImportanceOf'
    toggleImportanceOf(state, action) {
      console.log(current(state))
      const id = action.payload
      // array of notes returned with each note unchanged unless the note.id matches the id of the action payload
      // if it matches, the note is spread into an object, with the importance of it reversed
      return state.map(note => note.id !== id 
        ? note
        : {...note, important: !note.important}
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action){
      return action.payload
    }
  }
})

export const { toggleImportanceOf, createNote, appendNote, setNotes } = noteSlice.actions

export default noteSlice.reducer