const CommentsList = ({ comments }) => {
  if (!comments) {
    return null
  }
  return (<ul>
    {comments.map(comment => (<li key={Math.floor(Math.random() * 10000)}>{comment}</li>))}
  </ul>)
}

export default CommentsList