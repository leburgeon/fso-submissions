import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  if (action.type === 'CHANGE'){
    return action.payload
  } else if (action.type === 'CLEAR'){
    return ''
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationMessage, notificationDispatcher] = useReducer(notificationReducer, 'foo')

  return (
    <NotificationContext.Provider value={[notificationMessage, notificationDispatcher]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => {
  const dispatch = useContext(NotificationContext)[1]
  return (message) => {
    dispatch({type:'CHANGE', payload:message})
    setTimeout(() => dispatch({type:'CLEAR'}), 5000)
  }
}

export default NotificationContext
