import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  // States for the new blog data
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userFromLocal = localStorage.getItem('loggedInNotesUser')
    if (userFromLocal){
      setUser(JSON.parse(userFromLocal))
      // Wil need to add token to service module for adding a note
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({username, password})
      console.log('returned user',returnedUser)
      setUser(returnedUser)
      blogService.setToken(returnedUser.token)
      localStorage.setItem('loggedInNotesUser', JSON.stringify(returnedUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Failed to log in!')
    }
  }

  const handleCreateNote = async event => {
    event.preventDefault()
    const blogToAdd = {title, author, url}
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create(blogToAdd)
      setBlogs(prevBlogs => [...prevBlogs, addedBlog])
      notify(`A new blog '${addedBlog.title}' by ${addedBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      notify('blog not added')
    }
  }

  const notify = message => {
    setMessage(message)
    setShowMessage(true)
    setTimeout(() => {
      setMessage('')
      setShowMessage(false)
    }, 3000)
  }

  const displayLoginForm = () => (
    <LoginForm username={username} password={password}
      setUsername={setUsername} setPassword={setPassword}
      handleLogin={handleLogin}/>
  )

  const displayBlogs = () => (
    <>
      <p>{user.name} logged in</p>
      <button onClick={() => {
        localStorage.removeItem('loggedInNotesUser')
        setUser(null)
      }}>log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      
    </>
  )

  const displayCreateBlogForm = () => (
    <>
    <h2>create</h2>
    <form onSubmit={handleCreateNote}>
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

  return (
    <div>
      {showMessage && <Notification message={message}/>}
      {!user && displayLoginForm()}
      {user && displayBlogs()}
      {user && displayCreateBlogForm()}
      
    </div>
  )
}

export default App