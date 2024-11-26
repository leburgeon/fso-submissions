import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogListReducer'
import Togglable from './Togglable'

const BlogForm = ({ newBlogFormRef }) => {
  const dispatch = useDispatch()

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    dispatch(createBlog({
      title,
      author,
      url
    }))
    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable labelName="Create blog post" ref={newBlogFormRef}>
      <h2>create</h2>
      <form onSubmit={handleCreateBlog}>
        title:
        <input
          data-testid="titleInput"
          className="titleInput"
          type="text"
          name='title'
        />
        <br />
        author:
        <input
          data-testid="authorInput"
          className="authorInput"
          type="text"
          name='author'
        />
        <br />
        url:
        <input
          data-testid="urlInput"
          className="urlInput"
          type="text"
          name='url'
        />
        <button className="submitButton" type="submit">
          save
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm
