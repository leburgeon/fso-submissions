import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "./reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} 
      <strong>{note.important? ': Important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispacth = useDispatch()
  const notes = useSelector(store => store)

  return (
    <ul>
      {notes.map(note => 
        <Note 
          key={note.id} 
          note={note}
          handleClick={() => 
            dispacth(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes