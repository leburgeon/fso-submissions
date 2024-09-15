const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE'){
    // as concat returns a copy of the array, and does not modify the original, this reducer function remains 'pure'
    return [...state, action.payload]
  } else if (action.type === 'TOGGLE_IMPORTANCE'){
    return state.map(note => note.id === action.payload.id ? 
      {...note, 
        important : (!note.important)} 
      : note
    )
  }
  return state
}

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id
    }
  }
}

export default noteReducer