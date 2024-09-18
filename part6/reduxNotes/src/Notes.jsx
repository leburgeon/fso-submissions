import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "./reducers/noteReducer";
import noteService from './services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} 
      <strong>{note.important? ': Important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()

  // useSelector accepts a selector function that is responsible for selecting a part of the application state
  // useSelector subscribes to the redux store and re-runs when an action is dispatched
  // useSelector compares the reference of the result to the previous result, and only re-renders if there is a change
  const notes = useSelector(store => {
    if (store.filter === 'ALL'){
      return store.notes
    }

    return store.filter === 'IMPORTANT' 
      ? store.notes.filter(note => note.important)
      : store.notes.filter(note => !note.important)
  })


  return (
    <ul>
      {notes.map(note => 
        
        <Note 
          key={note.id} 
          note={note}
          handleClick={async () => {
              const updatedNote = await noteService.updateNote({...note, important: !note.important})
              dispatch(toggleImportanceOf(updatedNote.id))
            }
          }
        />
      )}
    </ul>
  )
}

export default Notes