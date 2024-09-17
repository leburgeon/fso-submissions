import ReactDOM from 'react-dom/client'
import React from 'react'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'

import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<Provider store={store}>
    <App/>
  </Provider>)
}

renderApp()
store.subscribe(renderApp)
store.subscribe(() => console.log(store.getState()))




