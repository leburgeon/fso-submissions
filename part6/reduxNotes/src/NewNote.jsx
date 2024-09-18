import { useDispatch } from "react-redux";
import { createNote } from "./reducers/noteReducer";
import noteService from './services/notes'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    // Event handler waits for the response from the server, containing the newly created note object
    // createNote action dispatched to the store with newNote from server as the payload
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note"/>
      <button type="submit">Save</button>
    </form>
  )
}

export default NewNote