import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hideWhenVisible = {display: showDetails? 'none' : ''}
  const showWhenVisible = {display: showDetails? '' : 'none'}
  
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    console.log(blog)
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleShowDetails}>Show details</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.likes} likes
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>{displayUserDetails}</div>
        <br/>
        <button onClick={toggleShowDetails}>Hide details</button>
      </div>
    </div>
  ) 
}

export default Blog