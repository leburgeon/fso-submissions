import { useSelector, useDispatch } from 'react-redux'
import { commentOnBlog, updateBlog } from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'
import CommentsList from './CommentsList'
import { TextField, Button, StepIcon } from '@mui/material'

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
      <Button variant='contained' className="likeButton" onClick={() => dispatch(updateBlog({ likes: blogToDisplay.likes + 1 || 1, id: blogToDisplay.id }))}>
        Like
      </Button>
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
        <div>
          <TextField type='text' placeholder='Add comment' name='comment'/>
        </div>
        <div>
          <Button style={{ margin: '5px' }} variant='contained' type='submit'>Send</Button>
        </div>
      </form>
    </div>
  </>)
}

export default BlogDisplay