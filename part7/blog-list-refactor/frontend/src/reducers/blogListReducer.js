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
    },
    removeBlog(state, action){
      return state.filter(blog => blog.id !== action.payload)
    },
    replaceBlog(state, action){
      return state.map(blog => blog.id === action.payload.id
        ? action.payload
        : blog)
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, replaceBlog } = blogListSlice.actions

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

export const deleteBlog = (blogId) => {
  return async dispatch => {
    if (window.confirm('Delete the blog?')) {
      try {
        await blogService.deleteBlog(blogId)
        dispatch(setThenClearNotification('Blog deleted successfully', 5))
        dispatch(removeBlog(blogId))
      } catch (exception) {
        if (exception.response.data.error === 'invalid token signature') {
          dispatch(setThenClearNotification('you didnt post that!', 5))
        } else {
          dispatch(setThenClearNotification(exception.response.data.error, 5))
        }
      }
    }
  }
}

export const updateBlog = (fields) => {
  return async dispatch => {
    try {
      const updated = await blogService.update(fields)
      dispatch(replaceBlog(updated))
    } catch (e) {
      console.log('#################################')
      console.log(e)
      dispatch(setThenClearNotification('failed to update the blog with fields ' + fields, 5))
    }
  }
}

