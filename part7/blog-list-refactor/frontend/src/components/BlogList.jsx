import { useDispatch, useSelector } from 'react-redux'
import { initialseBlogs } from '../reducers/blogListReducer'
import Blog from './Blog'
import { useEffect } from 'react'
import BlogForm from './BlogForm'

const BlogList = ({newBlogFormRef}) => {

  // When the bloglist component rendered first, the blogs are initialised
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialseBlogs())
  }, [])

  // Retrieves the current blogs from the store
  const blogs = useSelector(store => store.blogList)

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
      <BlogForm newBlogFormRef={newBlogFormRef}/>
    </>
  )
}

export default BlogList