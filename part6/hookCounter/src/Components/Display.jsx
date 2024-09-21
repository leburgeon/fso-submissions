
import { useCounterValue } from "../CounterContext";

const Display = () => {
  const counterValue = useCounterValue()

  return (
    <div>{counterValue}</div>
  )
}

export default Display