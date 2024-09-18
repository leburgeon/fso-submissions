import { useDispatch} from "react-redux"

import { useEffect } from "react"

import noteService from './services/notes'

import NewNote from "./NewNote"
import Notes from './Notes'
import VisibilityFilter from "./VisibilityFilter"

import { initialiseNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseNotes())
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