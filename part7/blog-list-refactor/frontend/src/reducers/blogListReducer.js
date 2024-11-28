import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setThenClearNotification } from './notificationReducer'
import { logout } from './userReducer'

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
    },
    addComment(state, action) {
      const blogToComment = state.find(blog => blog.id === action.payload.id)
      blogToComment.comments.push(action.payload.comment)
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, replaceBlog, addComment } = blogListSlice.actions

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
      if (e.response?.data?.error === 'Token expired, re login'){
        dispatch(setThenClearNotification('token expired, please re-login', 5))
        dispatch(logout())
      } else {
        dispatch(setThenClearNotification('blog not added' + e.name, 5))
      }
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

export const commentOnBlog = (blogId, comment) => {
  return async dispatch => {
    try {
      await blogService.comment(blogId, comment)
      dispatch(addComment({ id: blogId, comment }))
    } catch (e) {
      dispatch(setThenClearNotification('failed to comment on blog', 5))
    }
  }
}

