import { useSelector, useDispatch } from 'react-redux'
import { addComment, commentOnBlog, updateBlog } from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'
import CommentsList from './CommentsList'

const BlogDisplay = ({ blogToDisplayId }) => {

  const blogToDisplay = useSelector(store => store.blogList.find(blog => blog.id === blogToDisplayId))
  const dispatch = useDispatch()

  if (!blogToDisplay) {
    return null
  }

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
      <h3>Comments:</h3>
      <CommentsList comments={blogToDisplay.comments}></CommentsList>
      <form onSubmit={(event) => {
        event.preventDefault()
        const commnet = event.target.comment.value
        dispatch(commentOnBlog(blogToDisplay.id, commnet))
        event.target.comment.value = ''
      }}>
        <input type='text' placeholder='Add comment' name='comment'/>
        <button type='submit'>Send</button>
      </form>
    </div>
  </>)
}

export default BlogDisplay