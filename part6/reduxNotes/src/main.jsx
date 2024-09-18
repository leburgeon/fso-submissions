import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import store from './store'

import { Provider } from 'react-redux'

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




