import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setThenClearNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import LogoutButton from './components/LogoutButton'
import PrivateRoutes from './components/PrivateRoutes'

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

  const padding = { padding: '5px' }


  return (
    <div>
      <Notification/>
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/blogs'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        {user ? <LogoutButton/> : <Link style={padding} to='/login'>Login</Link>}
      </div>
      <Routes>
        <Route path='/' element={<p>Welcome</p>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/blogs' element={<BlogList newBlogFormRef={newBlogFormRef}/>}/>
          <Route path='/users' element={<UsersList/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
