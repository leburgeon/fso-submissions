import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationMessage = useContext(NotificationContext)[0]

  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification
