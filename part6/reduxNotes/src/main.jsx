import ReactDOM from 'react-dom/client'
import React from 'react'
import { legacy_createStore as createStore, combineReducers } from 'redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'

import { Provider } from 'react-redux'

const rootReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(rootReducer)

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




