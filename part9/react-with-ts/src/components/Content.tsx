import Part from "./Part"
import { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <div style={{border: '3px solid black'}}>
      {props.courseParts.map(coursePart => (
        <Part part={coursePart}/>
      ))}
    </div>
  )
}

export default Content
