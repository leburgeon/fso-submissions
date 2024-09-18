import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotificationText(state, action){
      return action.payload
    },
    clearNotificationText(state, action){
      return ''
    }
  }
})

export const { changeNotificationText, clearNotificationText } = notificationSlice.actions

// Async action creator that updates the notification message and then clears it after seconds amount of time
export const setNotification = (notificationMessage, seconds) => {
  return dispatch => {
    dispatch(changeNotificationText(notificationMessage))
    setTimeout(() => {
      dispatch(clearNotificationText())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer

