
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog} from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  let deleteButtonStyle = { display: '' }

  const user = useSelector(store => store.user)

  // Ensures that the delete button is not visible if the user is not the creator of the blog post
  if (blog.user) {
    if (blog.user.username) {
      deleteButtonStyle = {
        display: user.username !== blog.user.username ? 'none' : '',
      }
    }
  }

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
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </span>
        <button
          style={deleteButtonStyle}
          className="blogDeleteButton"
          onClick={() => dispatch(deleteBlog(blog.id))}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog
