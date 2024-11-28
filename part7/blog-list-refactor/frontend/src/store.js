import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'
import userReducer from './reducers/userReducer'
import usersListReducer from './reducers/usersListReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogList: blogListReducer,
    user: userReducer,
    usersList: usersListReducer
  }
})

export default store