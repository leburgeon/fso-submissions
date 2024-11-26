import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogList: blogListReducer
  }
})

export default store