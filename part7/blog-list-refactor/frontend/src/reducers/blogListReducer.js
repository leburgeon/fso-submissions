import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setThenClearNotification } from './notificationReducer'

const blogListSlice = createSlice({
  name: 'blogList',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    }
  }
})

export const { setBlogs, appendBlog } = blogListSlice.actions

export default blogListSlice.reducer

export const initialseBlogs = () => {
  return async dispatch => {
    try {
      const initialblogs = await blogService.getAll()
      dispatch(setBlogs(initialblogs))
    } catch (e) {
      dispatch(setThenClearNotification(e.name, 5))
    }
  }
}

export const createBlog = (blogToCreate) => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.create(blogToCreate)
      dispatch(setThenClearNotification('blog succesfully added', 5))
      dispatch(appendBlog(addedBlog))
    } catch (e) {
      dispatch(setThenClearNotification('blog not added' + e.name, 5))
    }
  }
}