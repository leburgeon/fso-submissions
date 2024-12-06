interface ContentProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(coursePart => (
        <p>{coursePart.name} {coursePart.exerciseCount}</p>
      ))}
    </div>
  )
}

export default Content
