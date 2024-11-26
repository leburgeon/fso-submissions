import { useSelector } from 'react-redux'

const inline = {
  backgroundColor: 'grey',
  padding: '10px',
  borderRadius: '5px',
  color: 'white',
  textAlign: 'center',
}

const Notification = ({ message }) => {
  const notificaiton = useSelector(state => state.notification)

  if (!notificaiton) {
    return <></>
  }
  return (
    <>
      <div style={inline}>{notificaiton}</div>
    </>
  )
}

export default Notification
