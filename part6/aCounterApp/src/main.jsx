
import React from "react";
import ReactDOM from 'react-dom/client'

import { legacy_createStore as createStore } from 'redux'

// a reducer is a function that takes a state and an action object.
// the action object has at least a 'type' attribute
// the recucer function uses the action to determine how/if it changes the state passed to it
const counterReducer = ( state = 0, action) => {
  switch(action.type){
    case 'ADD':
      return state + action.payload.amount
    case 'INCREMENT': 
      return state + 1;
    case 'DECREMENT': 
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state
  }
}

// a store is created using reduxes createStore function which takes a reducer as an argument
const store = createStore(counterReducer);


// methods are typically used to create and return the right action
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const add = (amount) => {
  return {
    type: 'ADD',
    payload: {
      amount
    }
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

// Store can access the state within it with the getState() method which returns the state tree contained within the store
// To modify state in some way, actions must be dispathed to the store using the store.dispatch(action) method
const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button 
        onClick={() => store.dispatch(increment())}
      >
        plus
      </button>
      <button
        onClick={() => store.dispatch(decrement())}
      >
        minus
      </button>
      <button 
        onClick={() => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
      <button 
        onClick={() => store.dispatch(add(10))}
      >
        add 10
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)