import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setThenClearNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import LogoutButton from './components/LogoutButton'
import PrivateRoutes from './components/PrivateRoutes'
import UsersList from './components/UsersList'
import UserDisplay from './components/UserDisplay'
import BlogDisplay from './components/BlogDisplay'
import { Container } from '@mui/material'

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

  // For retrieving the id of the user to display if the url matches
  const userDisplayMatch = useMatch('/users/:id')
  const userToDisplayId = userDisplayMatch
    ? userDisplayMatch.params.id
    : null

  // For retrieving the id of the blogDisplay from the url
  const blogDisplayMatch = useMatch('/blogs/:id')
  const blogToDisplayId = blogDisplayMatch
    ? blogDisplayMatch.params.id
    : null


  return (
    <Container>
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
          <Route path='/users/:id' element={<UserDisplay userToDisplayId={userToDisplayId}/>}/>
          <Route path='/blogs/:id' element={<BlogDisplay blogToDisplayId={blogToDisplayId}/>}/>
        </Route>
      </Routes>
    </Container>
  )
}

export default App
