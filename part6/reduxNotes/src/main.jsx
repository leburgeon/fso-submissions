import ReactDOM from 'react-dom/client'
import React from 'react'
import { legacy_createStore as createStore } from 'redux'
import noteReducer from './reducers/noteReducer'
import App from './App'

import { Provider } from 'react-redux'

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

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<Provider store={store}>
    <App/>
  </Provider>)
}

renderApp()
store.subscribe(renderApp)




