const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
}

const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part}/>
        )}
      </>
    )
  }

  const Total = ({parts}) => {
    return (
      <p><strong>total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</strong></p>
    )
  }

  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }

  export default Course