import { useSelector } from 'react-redux'

const UserDisplay = ({ userToDisplayId }) => {

  const userToDisplay = useSelector(store => store.usersList.find(user => user.id === userToDisplayId))

  if (!userToDisplay) {
    return null
  }

  return (
    <>
      <h2>{userToDisplay.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userToDisplay.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDisplay