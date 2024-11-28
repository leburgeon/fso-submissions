import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersListSlice = createSlice({
  name: 'usersList',
  initialState: [],
  reducers: {
    setUsersList(state, action){
      return action.payload
    }
  }
})

export const { setUsersList } = usersListSlice.actions

export default usersListSlice.reducer

export const initialiseUsersList = () => {
  return async dispatch => {
    const usersList = await usersService.getUsers()
    dispatch(setUsersList(usersList))
  }
}