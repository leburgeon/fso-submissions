import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseUsersList } from '../reducers/usersListReducer'
import UserInfoTile from './UserInfoTile'

const UsersList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseUsersList())
  }, [])
  const usersList = useSelector(store => store.usersList)

  return (
    <>
      <h2>Users:</h2>
      {usersList.map(userInfo => <UserInfoTile key={userInfo.id} userInfo={userInfo}></UserInfoTile>)}
    </>
  )
}

export default UsersList