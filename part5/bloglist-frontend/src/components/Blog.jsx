import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hideWhenVisible = { display: showDetails? 'none' : '' }
  const showWhenVisible = { display: showDetails? '' : 'none' }

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
        {blog.title} {blog.author}
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </div>
      <div style={hideWhenVisible}>
        <button className='showButton' onClick={toggleShowDetails}>Show details</button>
      </div>
      <div style={showWhenVisible} className='infoDiv'>
        <div className='likesDiv'>{blog.likes} likes
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