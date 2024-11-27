import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => {dispatch(logout())}}>
      log out
    </button>
  )
}

export default LogoutButton