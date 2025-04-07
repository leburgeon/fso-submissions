import { CoursePart } from "../types";
interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const { part } = props;

  let additionalInfo;

  switch (part.kind) {
    case 'basic': 
      additionalInfo = (
        <p>Description: {part.description}</p>
      )
      break;
    case 'background':
      additionalInfo = (
        <>
          <p>Description: {part.description}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </>
      )
      break;
    case 'group':
      additionalInfo = (
        <p>Group project count: {part.groupProjectCount}</p>
      )
      break;
    case 'special':
      additionalInfo = (
        <>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements}</p>
        </>
      )
      break;
  }

  return (
    <div style={{borderBottom: '2px solid yellow'}}>
      <p><b>Name: {part.name} </b></p>
      <p>Exercises: {part.exerciseCount}</p>
      <p>{additionalInfo}</p>
    </div>
  )
}

export default Part;