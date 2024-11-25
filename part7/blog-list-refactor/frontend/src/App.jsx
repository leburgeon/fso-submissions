import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const newBlogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        sortBlogs()
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const userFromLocal = localStorage.getItem('loggedInNotesUser')
    if (userFromLocal) {
      setUser(JSON.parse(userFromLocal))
      // Wil need to add token to service module for adding a note
    }
  }, [])

  const sortBlogs = () => {
    setBlogs((oldBlogs) => {
      const sorted = [...oldBlogs]
      return sorted.sort((a, b) => b.likes - a.likes)
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({ username, password })
      console.log('returned user', returnedUser)
      setUser(returnedUser)
      blogService.setToken(returnedUser.token)
      localStorage.setItem('loggedInNotesUser', JSON.stringify(returnedUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Failed to log in!')
    }
  }

  const handleLikeBlog = async (blogToLike) => {
    const updatedLikesBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    const returnedBlog = await blogService.update(updatedLikesBlog)

    setBlogs((oldBlogs) => {
      return oldBlogs.map((blog) =>
        blog.id !== returnedBlog.id ? blog : returnedBlog,
      )
    })
    sortBlogs()
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create(newBlog)
      setBlogs((prevBlogs) => [...prevBlogs, addedBlog])
      notify(`A new blog '${addedBlog.title}' by ${addedBlog.author} added`)
      newBlogFormRef.current.toggleVisibility()
    } catch {
      notify('blog not added')
    }
  }

  const handleDeleteBlog = async (blogToDel) => {
    if (window.confirm(`Delete the blog ${blogToDel.title}?`)) {
      try {
        blogService.setToken(user.token)
        await blogService.deleteBlog(blogToDel.id)
        setBlogs((oldBlogs) => {
          return oldBlogs.filter((blog) => blog.id !== blogToDel.id)
        })
      } catch (exception) {
        if (exception.response.data.error === 'invalid token signature') {
          notify('you didnt post that!')
        } else {
          notify(exception.response.data.error)
        }
      }
    }
  }

  const notify = (message) => {
    setMessage(message)
    setShowMessage(true)
    setTimeout(() => {
      setMessage('')
      setShowMessage(false)
    }, 3000)
  }

  const displayLoginForm = () => (
    <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )

  const displayBlogs = () => (
    <>
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          localStorage.removeItem('loggedInNotesUser')
          setUser(null)
        }}
      >
        log out
      </button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          loggedInUser={user}
          key={blog.id}
          blog={blog}
          handleLike={handleLikeBlog}
          handleDelete={handleDeleteBlog}
        />
      ))}
    </>
  )

  const displayCreateBlogForm = () => (
    <Togglable labelName="Create blog post" ref={newBlogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )

  return (
    <div>
      {showMessage && <Notification message={message} />}
      {!user && displayLoginForm()}
      {user && displayBlogs()}
      {user && displayCreateBlogForm()}
    </div>
  )
}

export default App
