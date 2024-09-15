const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE'){
    // as concat returns a copy of the array, and does not modify the original, this reducer function remains 'pure'
    return state.concat(action.payload)
  } else if (action.type === 'TOGGLE_IMPORTANCE'){
    return state.map(note => note.id === action.payload.id ? 
      {...note, 
        important : (!note.important)} 
      : note
    )
  }
  return state
}
export default noteReducer