import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// This component checks that a user is logged in, before rendering the routes with outlet
const PrivateRoutes = () => {
  const user = useSelector(store => store.user)

  return user
    ? <Outlet/>
    : <Navigate to='/login'/>
}

export default PrivateRoutes