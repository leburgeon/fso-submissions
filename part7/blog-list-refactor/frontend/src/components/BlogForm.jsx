import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogListReducer'
import Togglable from './Togglable'
import { TextField, Button } from '@mui/material'

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
        <TextField
          label='Title'
          data-testid="titleInput"
          className="titleInput"
          type="text"
          name='title'
        />
        <br />
        <TextField
          label='Author'
          data-testid="authorInput"
          className="authorInput"
          type="text"
          name='author'
        />
        <br />
        <TextField
          label='Url'
          data-testid="urlInput"
          className="urlInput"
          type="text"
          name='url'
        />
        <Button className="submitButton" type="submit">
          save
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
