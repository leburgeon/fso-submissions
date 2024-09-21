/* eslint-disable react/prop-types */
import { useCounterDispatch } from "../CounterContext";


const Button = ({ type, label }) => {
  const counterDispatch = useCounterDispatch()

  return (
    <button onClick={() => counterDispatch({type})}>
      {label}
    </button>
  )
}

export default Button