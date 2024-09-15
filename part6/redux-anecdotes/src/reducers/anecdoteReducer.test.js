import reducer from "./anecdoteReducer"

import deepFreeze from "deep-freeze"

describe('the anecdoteReducer', () => {
  const initialState = {
    anecdotes: [
      { content: "foo",
        id: 123,
        votes: 0
      },
      {
        content: "bar",
        id: 321,
        votes: 0
      }
    ]
  }

  test('increments vote count with the INCREMENT_VOTE_COUNT and the correct id', () => {
    const state = initialState
    deepFreeze(state)

    const newState = reducer(state, {type: 'INCREMENT_VOTE_COUNT', payload: {id: 123}})

    expect(newState).toEqual({
      anecdotes: [
        { content: "foo",
          id: 123,
          votes: 1
        },
        {
          content: "bar",
          id: 321,
          votes: 0
        }
      ]
    })
  })
})