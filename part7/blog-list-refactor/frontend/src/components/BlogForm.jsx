import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create</h2>
      <form onSubmit={createBlog}>
        title:
        <input
          data-testid="titleInput"
          className="titleInput"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:
        <input
          data-testid="authorInput"
          className="authorInput"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input
          data-testid="urlInput"
          className="urlInput"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button className="submitButton" type="submit">
          save
        </button>
      </form>
    </>
  )
}

export default BlogForm
