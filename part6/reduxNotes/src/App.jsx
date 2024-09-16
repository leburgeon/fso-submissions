import { createNote, toggleImportanceOf } from "./reducers/noteReducer"

import { useDispatch, useSelector } from "react-redux"

import NewNote from "./NewNote"
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'

const App = () => {
  const filterSelected = (value) => {
    console.log(value, ' selected for filtering')
  }

  
  return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App