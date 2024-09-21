import Display from "./Components/Display"
import Button from "./Components/Button"

import { CounterContextProvider } from "./CounterContext"

function App() {

  return (
    <CounterContextProvider >
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </CounterContextProvider>
  )
}

export default App
