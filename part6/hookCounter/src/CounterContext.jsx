import { createContext, useContext, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

// Context created using createContext function from react
// This context contains no data, but is used when asking react to fetch the data
// Provider attr on context used to wrap children that context is provided to
export const CounterContext = createContext()


// Components can use this functions to access the parts of the context that they need, rather than the whole context
export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}

// This component configures a counter state and dispatch function using the useReducer hook
// The component then returns a Context provider element, with the counter state and dispatch function as the context value
// Children wrapped in this context provider will have access to the counter context when using useContext hook
export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)
  
  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext

