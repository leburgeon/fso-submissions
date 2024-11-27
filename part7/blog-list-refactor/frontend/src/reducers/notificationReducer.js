import { createSlice } from '@reduxjs/toolkit'

// Slice of the store for storing the notification message
const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotificationMessage(state) {
      return ''
    }
  }
})

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions

// This function takes a message and the number of seconds to display that message for.
// It returns a thunk function that dispatches actions to the store to set the notification message
// and then clears it after the specified number of seconds.
export const setThenClearNotification = (message, seconds) => {
  return dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(clearNotificationMessage())
    }, seconds * 1000)
  }
}


export default notificationSlice.reducer