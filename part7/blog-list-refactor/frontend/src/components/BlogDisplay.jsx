import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'

const BlogDisplay = ({ blogToDisplayId }) => {

  const blogToDisplay = useSelector(store => store.blogList.find(blog => blog.id === blogToDisplayId))
  const dispatch = useDispatch()

  const addedBy = blogToDisplay.user || null

  return (<>
    <h2>{blogToDisplay.title}</h2>
    <div>
      <div>{blogToDisplay.likes} likes </div>
      <button className="likeButton" onClick={() => dispatch(updateBlog({ likes: blogToDisplay.likes + 1 || 1, id: blogToDisplay.id }))}>
        Like
      </button>
      <div>
        {blogToDisplay.user
          ? <div>
              Added by: <Link to={`/users/${blogToDisplay.user.id}`}>{blogToDisplay.user.username}</Link>
          </div> : 'Couldnt find who added this'}
      </div>
    </div>
  </>)
}

export default BlogDisplay