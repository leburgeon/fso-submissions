import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setThenClearNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserState(state, action) {
      return action.payload
    },
    removeUser(state, action){
      return null
    }
  }
})

export const { setUserState, removeUser } = userSlice.actions

export default userSlice.reducer

export const setUser = (user) => {
  return dispatch => {
    dispatch(setUserState(user))
    blogService.setToken(user.token)
    localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
  }
}

// Action creator for logging the user out
export const logout = () => {
  return dispatch => {
    dispatch(removeUser())
    localStorage.removeItem('loggedInBlogUser')
    blogService.setToken(null)
  }
}


// Async action creator for logging a user in
export const login = (credentials) => {
  return async dispatch => {
    try {
      const returnedUser = await loginService.login(credentials)
      dispatch(setUser(returnedUser))
    } catch (e) {
      dispatch(setThenClearNotification('Login failed',5))
      dispatch(logout())
    }
  }
}


