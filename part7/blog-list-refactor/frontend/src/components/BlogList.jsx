import { useDispatch, useSelector } from 'react-redux'
import { initialseBlogs } from '../reducers/blogListReducer'
import Blog from './Blog'
import { useEffect } from 'react'

const BlogList = ({ user, handleDeleteBlog, handleLikeBlog }) => {

  // When the bloglist component rendered first, the blogs are initialised
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialseBlogs())
  }, [])

  // Retrieves the current blogs from the store
  const blogs = useSelector(store => store.blogList)

  return (
    blogs.map((blog) => (
      <Blog
        loggedInUser={user}
        key={blog.id}
        blog={blog}
        handleLike={handleLikeBlog}
        handleDelete={handleDeleteBlog}
      />
    ))
  )
}

export default BlogList