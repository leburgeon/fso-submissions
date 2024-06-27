const Note = ({ note }) => {
    return (
      <li>{note.content} <div>
        Important: {note.important? "***" : "No"}</div></li>
    )
  }
  
  export default Note