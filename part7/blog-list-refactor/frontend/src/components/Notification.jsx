import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notificaiton = useSelector(state => state.notification)

  if (!notificaiton) {
    return <></>
  }
  return (
    <>
      <Alert severity='error'>{notificaiton}</Alert>
    </>
  )
}

export default Notification
