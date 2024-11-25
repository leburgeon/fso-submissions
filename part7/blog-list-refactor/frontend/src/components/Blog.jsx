import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, handleLike, handleDelete, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hideWhenVisible = { display: showDetails? 'none' : '' }
  const showWhenVisible = { display: showDetails? '' : 'none' }

  let deleteButtonStyle = { display: '' }

  if (blog.user){
    if (blog.user.username){
      deleteButtonStyle = { display: loggedInUser.username !== blog.user.username? 'none' : '' }
    }
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const displayUserDetails = blog.user ? blog.user.username : 'anon'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      <div className='titleAndAuthorDiv'>
        <span className='titleAndAuthorSpan'>{blog.title} {blog.author}</span>
        <button style={deleteButtonStyle} className='blogDeleteButton' onClick={() => handleDelete(blog)}>Delete</button>
      </div>
      <div style={hideWhenVisible}>
        <button className='showButton' onClick={toggleShowDetails}>Show details</button>
      </div>
      <div style={showWhenVisible} data-testid='infoDiv' className='infoDiv'>
        <div className='likesDiv'><span className='likeCountSpan'>{blog.likes} likes</span>
          <button className='likeButton' onClick={() => handleLike(blog)}>Like</button>
        </div>
        <a href={blog.url} className='blogUrl'>{blog.url}</a>
        <div className='userDetailsDiv'>{displayUserDetails}</div>
        <br/>
        <button className='hideButton' onClick={toggleShowDetails}>Hide details</button>
      </div>
    </div>
  )
}

export default Blog