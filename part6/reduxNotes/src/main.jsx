import ReactDOM from 'react-dom/client'
import React from 'react'
import { legacy_createStore as createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE'){
    // as concat returns a copy of the array, and does not modify the original, this reducer function remains 'pure'
    return state.concat(action.payload)
  }
  return state
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
  return (
    <div>
      <ul>
        {store.getState().map(note => {
          return (
            <li key={note.id}>
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




