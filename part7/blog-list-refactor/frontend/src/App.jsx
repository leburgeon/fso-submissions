import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setThenClearNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import { logout } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const newBlogFormRef = useRef()

  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

  // Effect hook for atttempting to retrieve login data from the local storage
  useEffect(() => {
    const userFromLocal = localStorage.getItem('loggedInBlogUser')
    if (userFromLocal) {
      try {
        const parsedUser = JSON.parse(userFromLocal)
        dispatch(setUser(parsedUser))
      } catch (e) {
        dispatch(setThenClearNotification('Trouble, please re-login'))
        localStorage.removeItem('loggedInBlogUser')
        blogService.setToken(null)
        setUser(null)
      }
    }
  }, [])


  const displayLoginForm = () => (
    <LoginForm/>
  )

  const displayBlogs = () => (
    <>
      <p>{user.name} logged in</p>
      <button onClick={() => {dispatch(logout())}}>
        log out
      </button>
      <h2>blogs</h2>
      <BlogList/>
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
