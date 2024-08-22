import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // States for the new blog data
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

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

  const handleCreateNote = async () => {
    console.log('creating note...', {title, author, url})
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
    <form onSubmit={handleCreateNote}>

    </form>
  )

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({username, password})
      console.log('returned user',returnedUser)
      setUser(returnedUser)
      localStorage.setItem('loggedInNotesUser', JSON.stringify(returnedUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('login failed!')
    }
  }

  return (
    <div>
      
      {user === null ? displayLoginForm()
        : displayBlogs()}
      
    </div>
  )
}

export default App