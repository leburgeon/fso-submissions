import ReactDOM from 'react-dom/client'
import store from './store'
import App from './App'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
