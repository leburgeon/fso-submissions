import { createNote, toggleImportanceOf } from "./reducers/noteReducer"

import { useDispatch, useSelector } from "react-redux"

import NewNote from "./NewNote"
import Notes from './Notes'

const App = (props) => {
  // This hook returns the dispatch function from the react-redux library 
  // Used to dispatch action to the store provided by the Provider wrapper
  const dispatch = useDispatch()

  // useSelector hook takes a selector callback which recieves the state of the root store,
  // the callback returns the data selected from the store.
  // This callback returns all the data in the store, since the store is only the notes array.
  // With more complex application state stores, specific parts of the application accessed with the selector
  const notes = useSelector(store => store)

  // old function that dispatches a NEW_NOTE type action, and is triggered by a submit event
  // accesses the data in the input field before dispathcing the action with it

  // new function does all this but dispatches the action with the use of an action creator
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }


  // This function is an action creator that takes a note id and returns an action
  // This action, when dispatched to the reducer, would toggle the importance of the note associated with the id in the store
  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }


  return (
    <div>
      <NewNote/>
      
      <Notes/>
    </div>
  )
}

export default App