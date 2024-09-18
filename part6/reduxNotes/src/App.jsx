import { setNotes } from "./reducers/noteReducer"

import { useDispatch} from "react-redux"

import { useEffect } from "react"

import noteService from './services/notes'

import NewNote from "./NewNote"
import Notes from './Notes'
import VisibilityFilter from "./VisibilityFilter"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
  }, [])

   return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App