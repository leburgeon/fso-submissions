import ReactDOM from 'react-dom/client'
import React from 'react'
import { legacy_createStore as createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'a new note added with a NEW_NOTE action',
    important: false,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'actions have two properties, the action type, and the data for the action',
    important: true,
    id: 2
  }
})

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: {
        id
      }
    })
  }

  
  return (
    <div>
      <form onSubmit={addNote}>
        <input placeholder='start typing a new note' name='note'/>
        <button type='submit'>Submit new note</button>
      </form>
      <ul>
        {store.getState().map(note => {
          return (
            <li key={note.id} onClick={() => toggleImportance(note.id)}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)




