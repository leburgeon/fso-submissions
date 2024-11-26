import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { setThenClearNotification as notify, setThenClearNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const dispatch = useDispatch()

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

  // Effect hook for atttempting to retrieve login data from the local storage
  useEffect(() => {
    const userFromLocal = localStorage.getItem('loggedInBlogUser')
    if (userFromLocal) {
      try {
        const parsedUser = JSON.parse(userFromLocal)
        setUser(parsedUser)
        blogService.setToken(parsedUser.token)
      } catch (e) {
        dispatch(setThenClearNotification('Trouble, please re-login'))
        localStorage.removeItem('loggedInBlogUser')
        blogService.setToken(null)
        setUser(null)
      }
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
      localStorage.setItem('loggedInBlogUser', JSON.stringify(returnedUser))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(notify('Failed to log in!', 5))
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
          dispatch(notify('you didnt post that!', 5))
        } else {
          dispatch(notify(exception.response.data.error, 5))
        }
      }
    }
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
      <BlogList user={user} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog}/>
    </>
  )

  const displayCreateBlogForm = () => (
    <BlogForm newBlogFormRef={newBlogFormRef}/>
  )

  return (
    <div>
      {<Notification/>}
      {!user && displayLoginForm()}
      {user && displayBlogs()}
      {user && displayCreateBlogForm()}
    </div>
  )
}

export default App
