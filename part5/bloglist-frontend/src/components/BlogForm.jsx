import { useState } from "react"

const BlogForm = ({handleCreateBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = event => {
    event.preventDefault()
    handleCreateBlog({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
      <h2>create</h2>
      <form onSubmit={createBlog}>
        title:
        <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <br/>
        author:
        <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <br/>
        url:
        <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
        <button type='submit'>create note</button>
      </form>
    </>
  )
}

export default BlogForm