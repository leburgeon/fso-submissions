import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'foo',
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

export default notificationSlice.reducer

