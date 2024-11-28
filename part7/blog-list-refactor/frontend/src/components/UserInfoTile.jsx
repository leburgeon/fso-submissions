import { Link } from 'react-router-dom'

const UserInfoTile = ({ userInfo }) => {
  console.log(userInfo)
  return(
    <div>
      <p><b>User:</b> <Link to={`/users/${userInfo.id}`}>{userInfo.username }</Link> <b>Blogs Created:</b> {userInfo.blogs.length}</p>
    </div>
  )
}

export default UserInfoTile