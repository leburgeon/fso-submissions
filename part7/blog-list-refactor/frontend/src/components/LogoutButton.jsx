import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Button } from '@mui/material'

const LogoutButton = () => {
  const dispatch = useDispatch()
  return (
    <Button color='inherit' onClick={() => {dispatch(logout())}}>
      log out
    </Button>
  )
}

export default LogoutButton