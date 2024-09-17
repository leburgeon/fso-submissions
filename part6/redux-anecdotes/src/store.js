import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";


// Configure store calls combine reducers on the reducer object
const store = configureStore({
  reducer : {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store