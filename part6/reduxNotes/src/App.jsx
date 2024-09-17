import { createNote, toggleImportanceOf } from "./reducers/noteReducer"

import { useDispatch, useSelector } from "react-redux"

import NewNote from "./NewNote"
import Notes from './Notes'
import VisibilityFilter from "./VisibilityFilter"

const App = () => {
   return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App