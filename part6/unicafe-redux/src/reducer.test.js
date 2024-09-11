import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

deepFreeze(counterReducer)

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  // Tests that the reducer increments the ok feedback count of the state properly 
  test('ok is incremented', () => {
    // Mock action for the reducer to respond to.
    // Real-case, the action would be deployed to the store, and the state would be consequently effected by it
    const action = {
      type: 'OK'
    }

    // Mock-state to pass the reducer to. The 'reducer' reduces the action and the original state to a single value
    const state = initialState
    // Deep freeze reccursivley calls object.freeze()
    // For testing purposes, this ensured that the original state is not altered, and so cannot be used to pass a test
    deepFreeze(state)

    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)

    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('when the counter has some values in it, it can be reset to initial state', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 2,
      ok: 4,
      bad: 1
    }

    deepFreeze(state)

    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})