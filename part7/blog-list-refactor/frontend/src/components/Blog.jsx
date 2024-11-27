import { useRef} from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogListReducer'

const Blog = ({ blog, loggedInUser }) => {
  const dispatch = useDispatch()
  const detailsDisplayRef = useRef()

  let deleteButtonStyle = { display: '' }

  // Ensures that the delete button is not visible if the user is not the creator of the blog post
  if (blog.user) {
    if (blog.user.username) {
      deleteButtonStyle = {
        display: loggedInUser.username !== blog.user.username ? 'none' : '',
      }
    }
  }

  const displayUserDetails = blog.user ? blog.user.username : 'anon'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blogDiv">
      <div className="titleAndAuthorDiv">
        <span className="titleAndAuthorSpan">
          {blog.title} {blog.author}
        </span>
        <button
          style={deleteButtonStyle}
          className="blogDeleteButton"
          onClick={() => dispatch(deleteBlog(blog.id))}
        >
          Delete
        </button>
      </div>
      <Togglable labelName="Show details" href={detailsDisplayRef}>
        <div data-testid="infoDiv" className="infoDiv">
          <div className="likesDiv">
            <span className="likeCountSpan">{blog.likes} likes</span>
            <button className="likeButton" onClick={() => dispatch(updateBlog({ likes: blog.likes + 1 || 1, id: blog.id }))}>
              Like
            </button>
          </div>
          <a href={blog.url} className="blogUrl">
            {blog.url}
          </a>
          <div className="userDetailsDiv">{displayUserDetails}</div>
          <br />
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
